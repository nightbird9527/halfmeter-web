/**
 * @description 基于axios封装的http请求模块
 */

import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios'
import { message, Modal } from 'antd';

export interface AxiosResponseData extends AxiosResponse {
	resData: any, 
	resDesc: string, 
	resCode: string, 
	errno: number
}

class Request {
	private instance: AxiosInstance;

	constructor() {
		// 创建实例
		this.instance = axios.create({
			baseURL: '/halfmeter-bms-web',
			timeout: 5000
		})

		// 设置请求拦截
		this.instance.interceptors.request.use(config => {
			return Promise.resolve(config)
		}, error => {
			console.log(error);
			return Promise.reject(error)
		})

		// 设置响应拦截
		this.instance.interceptors.response.use(response => {
			const { resData, resDesc, resCode, errno } = response.data;
			if (resDesc) {
				if (errno === 0) {
					message.success(resDesc);
				}
				if (errno === -1) {
					if (resCode === '0000') {
						Modal.error({
							title: '错误',
							content: resDesc,
							onOk: () => {
								if (resData && resData.noCookie) {
									location.href = '/login';
								}
							}
						})
					} else {
						message.error(resDesc)
					}
				}
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
