import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Login from 'src/pages/login';
import Layout from 'src/pages/layout';
import NotFound from 'src/pages/notFound';
import Home from 'src/pages/home';
import TagManage from 'src/pages/tag';
import ArticalManage from 'src/pages/artical';
import UserManage from 'src/pages/authority/user';
import RoleManage from 'src/pages/authority/role';
import ResourceManage from 'src/pages/authority/resource';
import JournalManage from 'src/pages/journal';

const { Routes, Route, Navigate  } = ReactRouterDOM;

const App = () => {
    return (
        <ConfigProvider theme={{ token: { colorPrimary: 'cyan' } }}>
            <Routes>
                <Route path='/' element={<Navigate to='/admin' />} />
                <Route path='/login' element={<Login />} />
                <Route path='/admin' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='home' index element={<Home />} />
                    <Route path="tag" element={<TagManage />} />
                    <Route path="artical" element={<ArticalManage />} />
                    <Route path="authority">
                        <Route path="user" element={<UserManage />} />
                        <Route path="role" element={<RoleManage />} />
                        <Route path="resource" element={<ResourceManage />} />
                    </Route>
                    <Route path="journal" element={<JournalManage />} />
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </ConfigProvider>
    )
}

export default App;
