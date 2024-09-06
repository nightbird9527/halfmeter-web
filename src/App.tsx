import React from 'react';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import {ConfigProvider, App as AntdApp} from 'antd';
import locale from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import {useThemeStore} from 'src/zustand';
import {topRoutes} from '@/routes';

const router = createBrowserRouter(topRoutes, {
  basename: '/admin',
});

export default function App() {
  const antdTheme = useThemeStore((state) => state.antdTheme);

  return (
    <ConfigProvider locale={locale} theme={antdTheme}>
      <AntdApp style={{height: '100%'}}>
        <RouterProvider router={router} fallbackElement={<p>Initial Loading...</p>} />;
      </AntdApp>
    </ConfigProvider>
  );
}
