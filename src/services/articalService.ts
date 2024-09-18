import {request} from 'utils';

const baseURL = '/articalManage';

// 查询文章
export const reqFetchArticalList = (payload: any) => {
  return request.post(`${baseURL}/query`, payload);
};

// 新建文章
export const reqCreateArtical = (payload: any) => {
  return request.post(`${baseURL}/create`, payload);
};

// 修改文章
export const reqUpdateArtical = (payload: any) => {
  return request.post(`${baseURL}/update`, payload);
};

// 删除文章
export const reqDeleteArtical = (payload: any) => {
  return request.post(`${baseURL}/delete`, payload);
};
