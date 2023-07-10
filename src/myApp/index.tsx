import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { useAppSelector } from 'src/redux/hooks';
import appRoutesConfig from 'src/routes';
import { themeConfig } from 'src/constants';

const { useRoutes } = ReactRouterDOM;

const MyApp = () => {
	const appConfig = useAppSelector(state => state.app);
	const { antdToken } = themeConfig[appConfig.theme];
	return (
		<ConfigProvider
			theme={{
				token: antdToken,
			}}
		>
			{
				useRoutes(appRoutesConfig)
			}
		</ConfigProvider>
	)
}

export default MyApp;