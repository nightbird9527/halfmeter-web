import React from 'react'
import * as ReactDOM from 'react-dom/client'
import * as ReactRouterDOM from 'react-router-dom'
import App from './App'
import './normalize.css'

const {BrowserRouter} = ReactRouterDOM;

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)