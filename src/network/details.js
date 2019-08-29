import {request} from './axios'

export function getDetails(iid){
    return request({
        url:'/detail',
        params:{
            iid
        }

    })
}