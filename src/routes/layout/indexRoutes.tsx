import React from 'react';
import {Route, Navigate} from 'react-router-dom';

import HomePage from 'src/pages/home';
import TagManage from 'src/pages/tag';
import ArticalManage from 'src/pages/artical';
import UserManage from '@/pages/systemManage/userManage';
import RoleManage from '@/pages/systemManage/roleManage';
import ResourceManage from '@/pages/systemManage/resourceManage';
import InterfaceManage from '@/pages/systemManage/interfaceManage';
import JournalManage from 'src/pages/journal';

export default (
  <>
    <Route path="home" Component={HomePage}></Route>
    <Route path="tagManage" Component={TagManage}></Route>
    <Route path="articalManage" Component={ArticalManage}></Route>
    <Route path="systemManage" element={<Navigate to="userManage" />}></Route>
    <Route path="systemManage">
      <Route path="userManage" Component={UserManage}></Route>
      <Route path="roleManage" Component={RoleManage}></Route>
      <Route path="resourceManage" Component={ResourceManage}></Route>
      <Route path="interfaceManage" Component={InterfaceManage}></Route>
    </Route>
    <Route path="journalManage" Component={JournalManage}></Route>
  </>
);
