import React from 'react'
import {
    HomeOutlined,
    UnorderedListOutlined
} from '@ant-design/icons'
import Home from 'src/pages/home';
import Journal from 'src/pages/journal'
// import { asyncImport } from 'utils';

// const Home = asyncImport(() => { import('../pages/home/index') });
// const Journal = asyncImport(() => { import('../pages/journal/index') });

// interface IRouteConfigItem {
//     label: string,
//     key: string,
//     icon: ReactElement,
//     element?: ReactElement,
//     children?: IRouteConfigItem
// }

const routesConfigList = [
    {
        label: '首页',
        key: '/home',
        icon: <HomeOutlined />,
        element: <Home />
    },
    {
        label: '日志',
        key: '/journal',
        icon: <UnorderedListOutlined />,
        element: <Journal />
    },
]

export default routesConfigList