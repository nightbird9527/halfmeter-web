import React from 'react';
import {
  HomeOutlined,
  ReadOutlined,
  TagsOutlined,
  LockOutlined,
  TeamOutlined,
  UserSwitchOutlined,
  DatabaseOutlined,
  ApiOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';

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
  },
  {
    label: '标签',
    path: 'tagManage',
    icon: <TagsOutlined />,
  },
  {
    label: '文章',
    path: 'articalManage',
    icon: <ReadOutlined />,
  },
  {
    label: '系统管理',
    path: 'systemManage',
    icon: <LockOutlined />,
    children: [
      {
        label: '用户管理',
        path: 'userManage',
        index: true,
        icon: <TeamOutlined />,
      },
      {
        label: '角色管理',
        path: 'roleManage',
        icon: <UserSwitchOutlined />,
      },
      {
        label: '资源管理',
        path: 'resourceManage',
        icon: <DatabaseOutlined />,
      },
      {
        label: '接口管理',
        path: 'interfaceManage',
        icon: <ApiOutlined />,
      },
    ],
  },
  {
    label: '日志',
    path: 'journalManage',
    icon: <UnorderedListOutlined />,
  },
];

export default routesList;
