/**
 * @description 基于axios封装的http请求模块
 */

import axios from 'axios';
import type {AxiosInstance} from 'axios';
import {Modal} from 'antd';
import {USER_INFO} from 'src/constants';

class Request {
  private instance: AxiosInstance;

  constructor() {
    // 创建实例
    this.instance = axios.create({
      baseURL: '/halfmeter-admin',
      timeout: 5000,
    });

    // 请求拦截
    this.instance.interceptors.request.use(
      (config) => {
        config.data = {
          busiData: config.data, // 业务数据
          metaData: localStorage.getItem(USER_INFO), // 元信息，如操作者ID、操作时间等
        };
        return Promise.resolve(config);
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截
    this.instance.interceptors.response.use(
      (response) => {
        const {code, msg, tokenExpired} = response.data;
        return new Promise((resolve, reject) => {
          if (tokenExpired) {
            return Modal.error({
              title: '错误',
              content: msg,
              onOk: () => {
                localStorage.removeItem(USER_INFO);
                location.href = '/login';
              },
            });
          }
          if (code === 500 || code === 400) {
            reject({title: 'Error', message: msg});
          }
          resolve(response.data);
        });
      },
      (error) => {
        const {
          message,
          response: {statusText},
        } = error;
        return Promise.reject({title: statusText, message});
      }
    );
  }

  get(url: string, params: any) {
    return new Promise<any>((resolve, reject) => {
      this.instance
        .post(url, params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  post(url: string, params: any) {
    return new Promise<any>((resolve, reject) => {
      this.instance
        .post(url, params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default new Request();
