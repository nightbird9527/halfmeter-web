import React, { useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import SiderBar from './siderBar';
import HeaderBar from './headerBar';
import FooterBar from './footerBar';
import { breadcrumbMap } from 'src/routes';
import contants from 'src/constants';
import { localStore } from 'src/utils';
import {useThemeStore} from 'src/zustand';
import './index.scss';

const { Outlet, useLocation, Link, useNavigate } = ReactRouterDOM;
const {USER_INFO} = contants;

const Layouts = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const {headerStyle, siderStyle, contentStyle, footerStyle} = useThemeStore(state => state);
	const userInfo = localStore.get(USER_INFO);

	useEffect(() => {
		if (!userInfo || !userInfo.userName) {
			navigate('/login')
		}
	}, [])

	// 获取当前路径片段
	const pathSnippets = location.pathname.split('/').filter((i) => i);
	// 面包屑导航Items
	const breadcrumbItems = pathSnippets.map((_, index) => {
		const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
		if (url === '/admin') {
			return {
				key: '/admin',
				title: <Link to="/admin"><HomeOutlined /></Link>,
			}
		}
		return {
			key: url,
			title: <Link to={url}>{breadcrumbMap[url]}</Link>,
		};
	});
	return (
		<Layout className='layout'>
			<HeaderBar headerStyle={headerStyle} />
			<Layout className='layout-center'>
				<SiderBar siderStyle={siderStyle} />
				<Layout.Content className='content' style={{backgroundColor: contentStyle.contentBgColor}}>
					<div className="content-breadcrumb">
						<Breadcrumb items={breadcrumbItems} />
					</div>
					<div className="content-container" >
						<Outlet />
					</div>
				</Layout.Content>
			</Layout>
			<FooterBar footerStyle={footerStyle} />
		</Layout>
	)
}

export default Layouts;