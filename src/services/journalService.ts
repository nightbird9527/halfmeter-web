import {request} from 'utils'

const baseURL = '/journal';

// 查询日志
export const reqFetchJournalList = (payload: any) => {
    return request.post(`${baseURL}/query`, payload)
}

// 新建日志
export const reqCreateJournal = (payload: any) => {
    return request.post(`${baseURL}/create`, payload)
}

// 修改日志
export const reqUpdateJournal = (payload: any) => {
    return request.post(`${baseURL}/update`, payload)
}

// 删除日志
export const reqDeleteJournal = (payload: any) => {
    return request.post(`${baseURL}/delete`, payload)
}