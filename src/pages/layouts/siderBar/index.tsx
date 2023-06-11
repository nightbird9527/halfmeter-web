import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Layout, Menu } from 'antd';
import menuRoutesConfig from 'src/routes/menuRoutes';

const { Sider } = Layout;
const { Link } = ReactRouterDOM;

const getMenuItems = (routesConfigList, prePath) => {
    const result = [];
    routesConfigList.forEach(item => {
        const currentPath = prePath ? `${prePath}/${item.path}` : item.path;
        const menuItem = {
            label: <Link to={currentPath}>{item.label}</Link>,
            key: item.path,
            icon: item.icon,
            children: undefined
        }
        if (item.children) {
            menuItem.label = item.label;
            menuItem.children = getMenuItems(item.children, currentPath)
        }
        result.push(menuItem)
    })
    return result
}

const SiderBar = (props) => {
    const {backGroundColor} = props;
    return (
        <Sider className='sider' style={{ backgroundColor: backGroundColor }}>
            <div className="sider-logo">
                <h1>lg</h1>
            </div>
            <Menu
                mode='inline'
                items={getMenuItems(menuRoutesConfig, null)}
                theme='light'
                style={{ backgroundColor: backGroundColor }}
            />
        </Sider>
    )
}

export default SiderBar;