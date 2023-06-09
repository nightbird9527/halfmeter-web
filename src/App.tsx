import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { useAppSelector } from 'src/redux/hooks';
import appRoutesConfig from 'src/routes'

const { useRoutes } = ReactRouterDOM;

const App = () => {
	const antdToken = useAppSelector(state => state.theme.antdToken);
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

export default App;