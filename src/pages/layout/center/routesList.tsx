import React from 'react';
import {
  HomeOutlined,
  ReadOutlined,
  TagsOutlined,
  LockOutlined,
  TeamOutlined,
  UserSwitchOutlined,
  DatabaseOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';

import Home from 'src/pages/home';
import TagManage from 'src/pages/tag';
import ArticalManage from 'src/pages/artical';
import UserManage from 'src/pages/authority/user';
import RoleManage from 'src/pages/authority/role';
import ResourceManage from 'src/pages/authority/resource';
import JournalManage from 'src/pages/journal';

export interface IMenuRouteConfigItem {
  label: string;
  path: string;
  element?: React.ReactNode;
  icon?: React.ReactNode;
  children?: IMenuRouteConfigItem[];
  index?: boolean;
}

const routesList = [
  {
    label: '首页',
    path: 'home',
    index: true,
    icon: <HomeOutlined />,
    element: <Home />,
  },
  {
    label: '标签',
    path: 'tagManage',
    icon: <TagsOutlined />,
    element: <TagManage />,
  },
  {
    label: '文章',
    path: 'articalManage',
    icon: <ReadOutlined />,
    element: <ArticalManage />,
  },
  {
    label: '权限管理',
    path: 'authorityManage',
    icon: <LockOutlined />,
    children: [
      {
        label: '用户管理',
        path: 'userManage',
        index: true,
        icon: <TeamOutlined />,
        element: <UserManage />,
      },
      {
        label: '角色管理',
        path: 'roleManage',
        icon: <UserSwitchOutlined />,
        element: <RoleManage />,
      },
      {
        label: '资源管理',
        path: 'resourceManage',
        icon: <DatabaseOutlined />,
        element: <ResourceManage />,
      },
    ],
  },
  {
    label: '日志',
    path: 'journalManage',
    icon: <UnorderedListOutlined />,
    element: <JournalManage />,
  },
];

export default routesList;
