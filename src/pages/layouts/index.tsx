import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons'
import SiderBar from './siderBar';
import HeaderBar from './headerBar';
import FooterBar from './footerBar';
import { themeConfig } from 'src/constants';
import { useAppSelector } from 'src/redux/hooks';
import menuRoutesConfig from 'src/routes/menuRoutes'
import './index.scss'

const { Outlet, useLocation, Link } = ReactRouterDOM;
const { Content } = Layout;

const getBreadcurmbMap = (menuRoutesConfig, prePath = '') => {
	let result = {};
	menuRoutesConfig.forEach(item => {
		const currentUrl = `${prePath}/${item.path}`;
		result[currentUrl] = item.label;
		if (item.children) {
			Object.assign(result, getBreadcurmbMap(item.children, currentUrl))
		}
	});
	return result
}

const Layouts = () => {
	const appConfig = useAppSelector(state => state.app);
	const { siderBarBgc, headerBgc, footerBgc, contentBgc, textColor } = themeConfig[appConfig.theme];

	const location = useLocation();
	const pathSnippets = location.pathname.split('/').filter((i) => i);
	const breadcrumbMap = getBreadcurmbMap(menuRoutesConfig);

	const extraBreadcrumbItems = pathSnippets.map((_, index) => {
		const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
		return {
			key: url,
			title: <Link to={url}>{breadcrumbMap[url]}</Link>,
		};
	});

	const breadcrumbItems = [
		{
			key: 'home',
			title: <Link to="/"><HomeOutlined /></Link>,
		},
	].concat(extraBreadcrumbItems);

	return (
		<Layout className='layout' >
			<SiderBar backGroundColor={siderBarBgc} textColor={textColor} />
			<Layout>
				<HeaderBar backGroundColor={headerBgc} />
				<Content className='content' style={{ backgroundColor: contentBgc }}>
					<div className="content-breadcrumb">
						<Breadcrumb items={breadcrumbItems} />
					</div>
					<div className="content-container" >
						<Outlet />
					</div>
				</Content>
				<FooterBar backGroundColor={footerBgc} />
			</Layout>
		</Layout>
	)
}

export default Layouts;