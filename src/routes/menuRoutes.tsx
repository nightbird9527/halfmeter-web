import React from 'react'
import {
    HomeOutlined,
    ReadOutlined,
    TagsOutlined,
    LockOutlined,
    TeamOutlined,
    UserSwitchOutlined,
    DatabaseOutlined,
    UnorderedListOutlined
} from '@ant-design/icons'

import Home from 'src/pages/home';
import Tag from 'src/pages/tag';
import Artical from 'src/pages/artical';
import User from 'src/pages/authority/user';
import Role from 'src/pages/authority/role';
import Resource from 'src/pages/authority/resource';
import Journal from 'src/pages/journal';

interface IMenuRouteConfigItem {
    label: string,
    path: string,
    element?: React.ReactNode,
    icon?: React.ReactNode,
    children?: IMenuRouteConfigItem[],
    index?: boolean
}

const menuRoutesConfig: IMenuRouteConfigItem[] = [
    {
        label: '首页',
        path: 'home',
        index: true,
        icon: <HomeOutlined />,
        element: <Home />
    },
    {
        label: '标签',
        path: 'tag',
        icon: <TagsOutlined />,
        element: <Tag />
    },
    {
        label: '文章',
        path: 'artical',
        icon: <ReadOutlined />,
        element: <Artical />
    },
    {
        label: '权限管理',
        path: 'authority',
        icon: <LockOutlined />,
        children: [
            {
                label: '用户管理',
                path: 'user',
                index: true,
                icon: <TeamOutlined />,
                element: <User />,
            },
            {
                label: '角色管理',
                path: 'role',
                icon: <UserSwitchOutlined />,
                element: <Role />,
            },
            {
                label: '资源管理',
                path: 'resource',
                icon: <DatabaseOutlined />,
                element: <Resource />,
            }
        ]
    },
    {
        label: '日志',
        path: 'journal',
        icon: <UnorderedListOutlined />,
        element: <Journal />
    },
]

export default menuRoutesConfig