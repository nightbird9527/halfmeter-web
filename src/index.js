import React from 'react'
import * as ReactDOM from 'react-dom/client'
import * as ReactRouterDOM from 'react-router-dom'
import App from './App'
import store from './redux'
import { Provider } from 'react-redux'
import './styles/index.scss'

const { BrowserRouter } = ReactRouterDOM;

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
)