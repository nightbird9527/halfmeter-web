/**
 * @description 基于axios封装的http请求模块
 */

import axios from 'axios';

axios.interceptors.request.use(function (config) {
    return Promise.resolve(config)
}, function (error) {
    return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
    return Promise.resolve(response)
}, function (error) {
    return Promise.reject(error)
})