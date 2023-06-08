import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Login from './pages/login'
import Layouts from './pages/layouts'
import NotFound from './pages/notFound'
import Home from './pages/home';
import Journal from './pages/journal';

const { Routes, Route, Navigate } = ReactRouterDOM;

const App = () => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#00b96b',
                },
            }}
        >
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<Layouts />}>
                    <Route index element={<Navigate to='/home' />} />
                    <Route path='home' element={<Home />} />
                    <Route path="journal" element={<Journal />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </ConfigProvider>
    )
}

export default App;