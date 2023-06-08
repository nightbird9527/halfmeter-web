import React from 'react';
import { Layout, Menu } from 'antd';
import routesConfigList from 'src/routes';
import './index.scss'

const { Sider } = Layout;

const SiderBar = () => {
    return (
        <Sider className='sider' style={{ backgroundColor: '#1f1f1f' }}>
            <div className="sider-logo">
                <h1>半米之内</h1>
            </div>
            <Menu mode='inline' items={routesConfigList} theme='dark' style={{ backgroundColor: '#141414' }} />
        </Sider>
    )
}

export default SiderBar;