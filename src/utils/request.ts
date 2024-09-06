/**
 * @description 基于axios封装的http请求模块
 */

import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {Modal} from 'antd';
import contants from 'src/constants';
import {localStore} from 'src/utils';

const {USER_INFO} = contants;

export interface AxiosResponseData extends AxiosResponse {
  resOutput: {
    data: any;
    msg: string;
  };
  opeResult: 'success' | 'error';
  tokenExpired?: boolean;
}

class Request {
  private instance: AxiosInstance;

  constructor() {
    // 创建实例
    this.instance = axios.create({
      baseURL: '/halfmeter-admin',
      timeout: 5000,
    });

    // 设置请求拦截
    this.instance.interceptors.request.use(
      (config) => {
        const userInfo = localStore.get(USER_INFO);
        config.data = {
          reqInput: config.data,
          reqUserInfo: JSON.stringify(userInfo),
        };
        return Promise.resolve(config);
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 设置响应拦截
    this.instance.interceptors.response.use(
      (response) => {
        const {resOutput, opeResult, tokenExpired} = response.data;
        return new Promise((resolve, reject) => {
          if (tokenExpired) {
            return Modal.error({
              title: '错误',
              content: resOutput.msg,
              onOk: () => {
                localStore.remove(USER_INFO);
                location.href = '/login';
              },
            });
          }
          if (opeResult === 'error') {
            reject({title: 'Error', message: resOutput.msg});
          }
          resolve(response);
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
          resolve(res.data);
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
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default new Request();
