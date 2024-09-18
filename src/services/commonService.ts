import {request} from 'utils';

const baseURL = '/commonService';

// 查询天气
export const reqFetchWeather = (payload?: any) => {
  return request.post(`${baseURL}/queryWeather`, payload);
};
