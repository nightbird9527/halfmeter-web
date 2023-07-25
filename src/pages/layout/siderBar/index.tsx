import React, {useState, useEffect} from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {menuRoutesConfig, type IMenuRouteConfigItem} from 'src/routes';

const { Sider } = Layout;
const { Link, useLocation } = ReactRouterDOM;
interface IMenuItem {
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: IMenuItem[],
    type?: 'group',
}

const getMenuItems = (routesConfigList: IMenuRouteConfigItem[], prePath) => {
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

// 获取可展开菜单的key
const getParentMenuKeys = (routesConfigList: IMenuRouteConfigItem[]) => {
    const result: string[] = [];
    routesConfigList.forEach(item => {
        if (item.children) {
            result.push(item.path);
            result.concat(getParentMenuKeys(item.children))
        }
    })
    return result
}

const SiderBar = (props) => {
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter((i) => i);
    const parentMenuKeys = getParentMenuKeys(menuRoutesConfig);

    const [selectedKeys, setSelectedKeys] = useState(() => {
        const state: string[] = [];
        const currentSelectedKey = pathSnippets[pathSnippets.length - 1];
        state.push(currentSelectedKey);
        return state
    })
    const [openKeys, setOpenKeys] = useState(() => {
        const state: string[] = [];
        pathSnippets.forEach(item => {
            if (parentMenuKeys.includes(item)) {
                state.push(item)
            }
        })
        return state
    })

    useEffect(() => {
        // location改变时激活对应菜单
        const currentSelectedKey = pathSnippets[pathSnippets.length - 1];
        setSelectedKeys([currentSelectedKey]);

        // location改变时展开对应菜单
        const currentOpenedKeys = pathSnippets.filter(item => parentMenuKeys.includes(item))
        setOpenKeys(currentOpenedKeys)
    }, [location])

    const handleSelect = ({item, key}) => {
        setSelectedKeys([key])
    }

    const handleOpenChange = openKeys => {
        setOpenKeys(openKeys)
    }

    return (
        <Sider className='sider'>
            <div className="sider-logo">
                <h1>BMXZ<br />HTGLXT</h1>
            </div>
            <Menu
                mode='inline'
                items={getMenuItems(menuRoutesConfig, '/admin')}
                selectedKeys={selectedKeys}
                openKeys={openKeys}
                onSelect={handleSelect}
                onOpenChange={handleOpenChange}
                theme='light'
            />
        </Sider>
    )
}

export default SiderBar;