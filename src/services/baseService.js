import Axios from "axios"
import { DOMAIN, TOKEN_BY_CLASS, TOKEN } from "../utils/settingSystem"



export class baseService {
    //put json về phía backend
    put = (url, model) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'PUT',
            data: model,
            headers: {
                'token': localStorage.getItem(TOKEN),
                'tokenByClass': TOKEN_BY_CLASS,
            }
        })
    }

    post = (url, model) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'POST',
            data: model,
            headers: {
                'token': localStorage.getItem(TOKEN),
                'tokenByClass': TOKEN_BY_CLASS,
            }
        })
    }


    get = (url) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'GET',
            headers: {
                'token': localStorage.getItem(TOKEN),
                'tokenByClass': TOKEN_BY_CLASS,
            }
        })
    }

    delete = (url) => {
        return Axios({
            url: `${DOMAIN}/${url}`,
            method: 'DELETE',
            headers: {
                'token': localStorage.getItem(TOKEN),
                'tokenByClass': TOKEN_BY_CLASS,
            }
        })
    }
}