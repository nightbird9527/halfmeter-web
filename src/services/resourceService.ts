import {request} from 'utils';

const baseURL = '/systemManage/resourceManage';

// 获取资源列表
export const reqFetchResourceList = (payload: any) => {
  return request.post(`${baseURL}/queryResourceList`, payload);
};

// 获取资源树
export const reqFetchResourceTree = (payload?: any) => {
  return request.post(`${baseURL}/queryResourceTree`, payload);
};

// 新增资源
export const reqCreateResource = (payload: any) => {
  return request.post(`${baseURL}/createResource`, payload);
};

// 修改资源
export const reqUpdateResource = (payload: any) => {
  return request.post(`${baseURL}/updateResource`, payload);
};

// 删除资源
export const reqDeleteResource = (payload: any) => {
  return request.post(`${baseURL}/deleteResource`, payload);
};
