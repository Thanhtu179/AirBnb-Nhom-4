import { history } from '../../App';
import { managerUsersService } from "../../services/ManagerUsersService"
import { LOGIN, SET_ARR_USERS, SET_ARR_USERS_BY_PANIGATION, SET_USER_INFO, SET_USER_INFO_BY_ID } from '../Types/ManagerUsersType';
import { closeDrawer } from './AdminControlAction';


export const loginAction = (loginInfo) => {
    return async (dispatch) => {
        try {
            const result = await managerUsersService.login(loginInfo);
            if (result.status === 200) {
                await dispatch({
                    type: LOGIN,
                    loginInfo: result.data
                });
                let userInfoLogin = await managerUsersService.getUserInfoById(result.data.user._id);
                if (userInfoLogin.status === 200) {
                    await dispatch({
                        type: SET_USER_INFO,
                        userInfo: userInfoLogin.data,
                    })
                }
                //Chuyển hướng đăng nhập về trang trước đó
                history.goBack();
            }
        } catch (error) {
            console.log(error);
        }

    }

}

export const registerAction = (registerInfo) => {
    return async (dispatch) => {
        try {
            const result = await managerUsersService.register(registerInfo);
            if (result.status === 200) {
                alert("Bạn đâ đăng ký thành công");
                history.push("/login");
            }
        } catch (error) {
            console.log(error);
        }

    }

}


export const getUserInfoAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await managerUsersService.getUserInfoById(id);
            if (result.status === 200) {
                await dispatch({
                    type: SET_USER_INFO_BY_ID,
                    userInfo: result.data
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const getAllUser = () => {
    return async (dispatch) => {
        try {
            const result = await managerUsersService.getAllUser();
            if (result.status === 200) {
                await dispatch({
                    type: SET_ARR_USERS,
                    arrUsers: result.data
                })
            }
        } catch (error) {
            console.log(error);
        }

    }

}

export const deleteUserByIdAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await managerUsersService.deleteUser(id);
            if (result.status === 200) {
                alert('Xóa thành công');
                dispatch(closeDrawer())
                window.location.reload();
            }
        } catch (error) {
            alert("xoa khong thanh cong")
        }

    }

}

export const updateUserByIdAction = (id, updateInfo) => {
    return async (dispatch) => {
        try {
            const result = await managerUsersService.updateUserInfo(id, updateInfo);
            if (result.status === 200) {
                alert('Cập nhật phim thành công!');
                dispatch(closeDrawer())
                window.location.reload();
            }
        } catch (error) {
            alert("Cập nhật không thành công có lỗi")
            console.log(error);
        }

    }

}

export const addUser = (userInfo) => {
    return async (dispatch) => {
        try {
            const result = await managerUsersService.createUser(userInfo)
            if (result.status === 200) {
                alert('Thêm quản trị thành công');
                dispatch(closeDrawer());
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const getUserByPagination = (pagination) => {
    return async (dispatch) => {
        try {
            const result = await managerUsersService.getUserListByPagination(pagination);
            if (result.status === 200) {
                dispatch({
                    type: SET_ARR_USERS_BY_PANIGATION,
                    arrUserByPanigation: result.data,
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}