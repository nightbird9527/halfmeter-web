import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import Login from './pages/login'
import Admin from './pages/admin'
import NotFound from './pages/notFound'

const { Routes, Route } = ReactRouterDOM;

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Admin />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default App;