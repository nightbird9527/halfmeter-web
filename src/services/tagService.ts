import {request} from 'utils'

const baseURL = '/tag';

export const reqCreateTag = (payload) => {
    return request.post(`${baseURL}/create`, payload)
}

export const reqUpdateTag = (payload) => {
    return request.post(`${baseURL}/update`, payload)
}