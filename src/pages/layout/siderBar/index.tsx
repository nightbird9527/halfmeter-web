import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { menuRoutesConfig, type IMenuRouteConfigItem } from 'src/routes';
import { ISiderBarProps, IMenuItem } from './interface'
import './index.scss'

const { Sider } = Layout;
const { Link, useLocation } = ReactRouterDOM;

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

const SiderBar: React.FC<ISiderBarProps> = (props) => {
    const { siderStyle: { siderBgColor, siderTextColor, siderBorderColor } } = props;

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

    // 获取MenuItems
    const getMenuItems = (routesConfigList: IMenuRouteConfigItem[], prePath) => {
        const result: IMenuItem[] = [];
        routesConfigList.forEach(item => {
            const currentPath = prePath ? `${prePath}/${item.path}` : item.path;
            const menuItem: IMenuItem = {
                label: (
                    <Link to={currentPath} style={{ color: siderTextColor }}>
                        <span style={{ paddingRight: '10px' }}>{item.icon}</span>
                        <span>{item.label}</span>
                    </Link>
                ),
                key: item.path,
            };
            if (item.children) {
                menuItem.label = (
                    <div style={{ color: siderTextColor }}>
                        <span style={{ paddingRight: '10px' }}>{item.icon}</span>
                        <span>{item.label}</span>
                    </div>
                );
                menuItem.children = getMenuItems(item.children, currentPath)
            }
            result.push(menuItem)
        })
        return result
    }
    const menuItems = getMenuItems(menuRoutesConfig, '/admin')



    const handleSelect = ({ key }) => {
        setSelectedKeys([key])
    }

    const handleOpenChange = openKeys => {
        setOpenKeys(openKeys)
    }

    return (
        <Sider className='siderbar' style={{ backgroundColor: siderBgColor, borderRight: `1px solid ${siderBorderColor}` }}>
            <Menu
                mode='inline'
                items={menuItems}
                selectedKeys={selectedKeys}
                openKeys={openKeys}
                onSelect={handleSelect}
                onOpenChange={handleOpenChange}
                style={{ backgroundColor: siderBgColor, border: 0 }}
            />
        </Sider>
    )
}

export default SiderBar;