import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import routesConfigList from 'src/routes';
import './index.scss'
import Home from '../home';
import Journal from '../journal';
import NotFound from '../notFound';

const { Link, Outlet } = ReactRouterDOM;
const { Sider, Header, Content, Footer } = Layout;

const Layouts = () => {
    const menuItems = routesConfigList.map(item => {
        return {
            label: <Link to={item.key}>{item.label}</Link>,
            key: item.key,
            icon: item.icon,
        }
    })

    return (
        <Layout className='layout'>
            <Sider className='sider' style={{ backgroundColor: '#666' }}>
                <div className="sider-logo">
                    <h1>lg</h1>
                </div>
                <Menu
                    mode='inline'
                    items={menuItems}
                    theme='light'
                    style={{ backgroundColor: '#666' }}
                />
            </Sider>
            <Layout>
                <Header style={{ backgroundColor: '#999' }}>Header</Header>
                <Content style={{ backgroundColor: '#555' }}>
                    <Breadcrumb />
                    <div className="content-container">
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ backgroundColor: '#999' }}>FooterBar</Footer>
            </Layout>
        </Layout>
    )
}

export default Layouts;