/**
 * @description 基于axios封装的http请求模块
 */

import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {Modal} from 'antd'
import { USER_INFO } from 'src/constants'
import {localStore} from 'src/utils'

export interface AxiosResponseData extends AxiosResponse {
	data: any, 
	desc: string, 
	code: string, 
}

class Request {
	private instance: AxiosInstance;

	constructor() {
		// 创建实例
		this.instance = axios.create({
			baseURL: '/halfmeter-admin',
			timeout: 5000
		})

		// 设置请求拦截
		this.instance.interceptors.request.use(config => {
			return Promise.resolve(config)
		}, error => {
			return Promise.reject(error)
		})

		// 设置响应拦截
		this.instance.interceptors.response.use(response => {
			const { desc, code } = response.data;
			if (code === '00') {
				Modal.error({
					title: '错误',
					content: desc,
					onOk: () => {
						localStore.remove(USER_INFO)
						location.href = '/login';
					}
				})
			}
			return Promise.resolve(response.data)
		}, error => {
			return Promise.reject(error)
		})
	}

	get(url: string, params: any) {
		return this.instance.get(url, {
			params
		})
	}

	post(url: string, data: any) {
		return this.instance.post(url, data)
	}
}

export default new Request();
