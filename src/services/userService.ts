import {request} from 'utils';

const baseURL = '/systemManage/userManage';

// 查询用户列表
export const reqFetchUserList = (payload: any) => {
  return request.post(`${baseURL}/query`, payload);
};

// 查询用户详情信息
export const reqFetchUserDetailInfo = (payload: any) => {
  return request.post(`${baseURL}/query/detail`, payload);
};

// 新建用户
export const reqCreateUser = (payload: any) => {
  return request.post(`${baseURL}/create`, payload);
};

// 修改用户信息
export const reqUpdateUser = (payload: any) => {
  return request.post(`${baseURL}/update`, payload);
};

// 删除用户
export const reqDeleteUser = (payload: any) => {
  return request.post(`${baseURL}/delete`, payload);
};
