import React, {useEffect} from 'react';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import {ConfigProvider, App as AntdApp} from 'antd';
import locale from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import {useThemeStore} from 'src/zustand';
import {topRoutes} from '@/routes';

const env = process.env.NODE_ENV;

const router = createBrowserRouter(topRoutes, {
  basename: env === 'production' ? '/admin' : '/',
});

export default function App() {
  const {themeFlag, antdToken} = useThemeStore();

  useEffect(() => {
    document.body.className = themeFlag;
  }, [themeFlag]);

  return (
    <ConfigProvider locale={locale} theme={antdToken}>
      <AntdApp style={{height: '100%'}}>
        <RouterProvider router={router} fallbackElement={<p>Initial Loading...</p>} />
      </AntdApp>
    </ConfigProvider>
  );
}
