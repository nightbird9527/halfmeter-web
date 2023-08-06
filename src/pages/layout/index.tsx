import React, {useEffect} from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons'
import SiderBar from './siderBar';
import HeaderBar from './headerBar';
import FooterBar from './footerBar';
import { breadcrumbMap } from 'src/routes'
import { USER_INFO } from 'src/constants'
import {localStore} from 'src/utils'

import './index.scss'

const { Outlet, useLocation, Link, useNavigate } = ReactRouterDOM;
const { Content } = Layout;

const Layouts = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const userInfo = localStore.get(USER_INFO);

	useEffect(() => {
		if (!userInfo || !userInfo.user_name) {
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
			<SiderBar />
			<Layout>
				<HeaderBar />
				<Content className='content'>
					<div className="content-breadcrumb">
						<Breadcrumb items={breadcrumbItems} />
					</div>
					<div className="content-container" >
						<Outlet />
					</div>
				</Content>
				<FooterBar />
			</Layout>
		</Layout>
	)
}

export default Layouts;