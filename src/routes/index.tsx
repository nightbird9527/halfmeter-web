import React from 'react'
import { Navigate } from 'react-router-dom'
import Login from 'src/pages/login';
import Layouts from 'src/pages/layouts';
import NotFound from 'src/pages/notFound';
import menuRoutesConfig from './menuRoutes';

const getSubRoutes = (subRoutesConfig) => {
    const result = [];
    subRoutesConfig.forEach(item => {
        if (item.index) {
            const indexRouteItem = {
                index: true,
                element: <Navigate to={item.path} />,
            }
            result.push(indexRouteItem)
        }
        const routeItem = {
            path: item.path,
            element: item.element,
            children: undefined
        };
        if (item.children) routeItem.children = getSubRoutes(item.children);
        result.push(routeItem)
    })
    return result
}

const appRoutesConfig = [
    {
        path: 'login',
        element: <Login />
    },
    {
        path: '/',
        element: <Layouts />,
        children: getSubRoutes(menuRoutesConfig)
    },
    {
        path: '*',
        element: <NotFound />,
    },
]

export default appRoutesConfig