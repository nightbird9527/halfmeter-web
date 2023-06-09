import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ConfigProvider } from 'antd';
import appRoutesConfig from 'src/routes'

const { useRoutes } = ReactRouterDOM;

const App = () => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#00b96b',
                },
            }}
        >
            {
                useRoutes(appRoutesConfig)
            }
        </ConfigProvider>
    )
}

export default App;