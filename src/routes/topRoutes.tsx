import React from 'react';
import {createRoutesFromElements, Route, Navigate} from 'react-router-dom';
import Login from '@/pages/login';
import Layout from '@/pages/layout';
import NotFound from '@/pages/notFound';
import LayoutRoutes from './layout';

export default createRoutesFromElements(
  <Route>
    <Route path="/login" Component={Login}></Route>
    <Route path="/" element={<Navigate to="/home" />}></Route>
    <Route path="/" Component={Layout}>
      {LayoutRoutes}
    </Route>
    <Route path="*" Component={NotFound}></Route>
  </Route>
);
