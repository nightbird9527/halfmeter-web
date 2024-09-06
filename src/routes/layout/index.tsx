import React from 'react';
import {Route} from 'react-router-dom';

import HomePage from 'src/pages/home';
import TagManage from 'src/pages/tag';
import ArticalManage from 'src/pages/artical';
import UserManage from 'src/pages/authority/user';
import RoleManage from 'src/pages/authority/role';
import ResourceManage from 'src/pages/authority/resource';
import JournalManage from 'src/pages/journal';

export default (
  <>
    <Route path="home" Component={HomePage}></Route>
    <Route path="tagManage" Component={TagManage}></Route>
    <Route path="articalManage" Component={ArticalManage}></Route>
    <Route path="authorityManage">
      <Route path="userManage" Component={UserManage}></Route>
      <Route path="roleManage" Component={RoleManage}></Route>
      <Route path="resourceManage" Component={ResourceManage}></Route>
    </Route>
    <Route path="journalManage" Component={JournalManage}></Route>
  </>
);
