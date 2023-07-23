import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ConfigProvider } from 'antd';
import appRoutesConfig from 'src/routes';
import { themeConfig } from 'src/constants';

const { useRoutes } = ReactRouterDOM;

const MyApp = () => {
	return (
		<ConfigProvider
			theme={{
				token: { colorPrimary: 'cyan' },
			}}
		>
			{
				useRoutes(appRoutesConfig)
			}
		</ConfigProvider>
	)
}

export default MyApp;