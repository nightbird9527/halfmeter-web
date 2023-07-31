import React, {useEffect} from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ConfigProvider, App } from 'antd';
import useStaticFuncStore from 'src/store';
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

import type { MessageInstance } from 'antd/es/message/interface';
import type { ModalStaticFunctions } from 'antd/es/modal/confirm';
import type { NotificationInstance } from 'antd/es/notification/interface';
let message: MessageInstance;
let notification: NotificationInstance;
let modal: Omit<ModalStaticFunctions, 'warn'>;

const { Routes, Route, Navigate  } = ReactRouterDOM;

const MyApp = () => {
    const {message, modal, notification} = App.useApp();
    const initial = useStaticFuncStore((state: any) => state.initial)

    useEffect(() => {
        initial(message, modal, notification)
    }, [])

    return (
        <ConfigProvider theme={{ token: { colorPrimary: 'cyan' } }}>
            <Routes>
                <Route path='/' element={<Navigate to='/admin' />} />
                <Route path='/login' element={<Login />} />
                <Route path='/admin' element={<Layout />}>
                    <Route index element={<Navigate to='home' />} />
                    <Route path='home' index element={<Home />} />
                    <Route path="tag" element={<TagManage />} />
                    <Route path="artical" element={<ArticalManage />} />
                    <Route path="authority">
                        <Route index element={<Navigate to='user' />} />
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

export default MyApp;
export { message, notification, modal };