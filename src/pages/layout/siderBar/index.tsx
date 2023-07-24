import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {menuRoutesConfig} from 'src/routes';

const { Sider } = Layout;
const { Link } = ReactRouterDOM;
interface IMenuItem {
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: IMenuItem[],
    type?: 'group',
}

const getMenuItems = (routesConfigList, prePath) => {
    const result: IMenuItem[] = [];
    routesConfigList.forEach(item => {
        const currentPath = prePath ? `${prePath}/${item.path}` : item.path;
        const menuItem: IMenuItem = {
            label: <Link to={currentPath}>{item.label}</Link>,
            key: item.path,
            icon: item.icon,
        };
        if (item.children) {
            menuItem.label = item.label;
            menuItem.children = getMenuItems(item.children, currentPath)
        }
        result.push(menuItem)
    })
    return result
}

const SiderBar = (props) => {
    return (
        <Sider className='sider'>
            <div className="sider-logo">
                <h1>BMXZ<br />HTGLXT</h1>
            </div>
            <Menu
                mode='inline'
                items={getMenuItems(menuRoutesConfig, '/admin')}
                theme='light'
            />
        </Sider>
    )
}

export default SiderBar;