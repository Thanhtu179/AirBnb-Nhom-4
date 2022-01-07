import { TOKEN, USER_INFO, USER_LOGIN } from "../../utils/settingSystem";
import { LOGIN, SET_ARR_USERS, SET_ARR_USERS_BY_PANIGATION, SET_USER_INFO, SET_USER_INFO_BY_ID } from "../Types/ManagerUsersType";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

let info = {};
if (localStorage.getItem(USER_INFO)) {
    user = JSON.parse(localStorage.getItem(USER_INFO));
}

const initialState = {
    userInfo: info,
    userLogin: user,
    userInfoById: {},
    arrUsers: [],
    arrUserByPagination: []
}

export default (state = initialState, action) => {
    switch (action.type) {

        case SET_USER_INFO: {
            localStorage.setItem(USER_INFO, JSON.stringify(action.userInfo));
            state.userLoginInfo = { ...action.userInfo }
            return { ...state };
        }

        case LOGIN: {
            let { loginInfo } = action;
            localStorage.setItem(USER_LOGIN, JSON.stringify(loginInfo.user));
            localStorage.setItem(TOKEN, loginInfo.token);
            return { ...state, userLogin: loginInfo.user }
        }

        case SET_ARR_USERS: {
            state.arrUsers = action.arrUsers;
            return { ...state }
        };

        case SET_USER_INFO_BY_ID: {
            state.userInfoById = { ...action.userInfo };
            return { ...state };
        }

        case SET_ARR_USERS_BY_PANIGATION: {
            state.arrUserByPagination = action.arrUserByPanigation;
            return { ...state }
        }
        default:
            return state
    }

}

