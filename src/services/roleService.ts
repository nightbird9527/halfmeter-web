import {request} from 'utils';

const baseURL = '/systemManage/roleManage';

// 查询角色列表
export const reqFetchRoleList = (payload: any) => {
  return request.post(`${baseURL}/query`, payload);
};

// 新建角色
export const reqCreateRole = (payload: any) => {
  return request.post(`${baseURL}/create`, payload);
};

// 修改角色
export const reqUpdateRole = (payload: any) => {
  return request.post(`${baseURL}/update`, payload);
};

// 删除角色
export const reqDeleteRole = (payload: any) => {
  return request.post(`${baseURL}/delete`, payload);
};
