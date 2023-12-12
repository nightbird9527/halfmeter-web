import {request} from 'utils'

const baseURL = '/tag';

// 查询标签
export const reqFetchTagList = (payload: any) => {
    return request.post(`${baseURL}/query`, payload)
}

// 新建标签
export const reqCreateTag = (payload: any) => {
    return request.post(`${baseURL}/create`, payload)
}

// 修改标签
export const reqUpdateTag = (payload: any) => {
    return request.post(`${baseURL}/update`, payload)
}

// 删除标签
export const reqDeleteTag = (payload: any) => {
    return request.post(`${baseURL}/delete`, payload)
}