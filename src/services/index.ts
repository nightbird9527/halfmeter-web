import {request} from 'utils'
export {reqUserLogin, reqTouristLogin} from './loginService'
export {reqFetchArticalList, reqCreateArtical, reqUpdateArtical, reqDeleteArtical} from './articalService'
export {reqFetchTagList, reqCreateTag, reqUpdateTag, reqDeleteTag} from './tagService'
export {reqFetchJournalList, reqCreateJournal, reqUpdateJournal, reqDeleteJournal} from './journalService'
export {reqFetchRoleList, reqCreateRole, reqUpdateRole, reqDeleteRole} from './roleService'

const baseURL = '/commonService'

// 查询天气
export const reqFetchWeather = (payload?: any) => {
    return request.post(`${baseURL}/queryWeather`, payload)
}