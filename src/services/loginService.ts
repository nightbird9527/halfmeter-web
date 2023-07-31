import {request} from 'utils'

const baseURL = '/login';

export const reqUserLogin = (payload) => {
    return request.post(`${baseURL}/userLogin`, payload)
}

export const reqTouristLogin= (payload) => {
    return request.post(`${baseURL}/touristLogin`, payload)
}