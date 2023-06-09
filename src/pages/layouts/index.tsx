import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';
import SiderBar from './siderBar';
import HeaderBar from './headerBar';
import FooterBar from './footerBar';
import './index.scss'

const { Outlet } = ReactRouterDOM;
const { Content } = Layout;

const Layouts = () => {
    return (
        <Layout className='layout'>
            <SiderBar />
            <Layout>
                <HeaderBar />
                <Content style={{ backgroundColor: '#555' }}>
                    <Breadcrumb />
                    <div className="content-container">
                        <Outlet />
                    </div>
                </Content>
                <FooterBar />
            </Layout>
        </Layout>
    )
}

export default Layouts;