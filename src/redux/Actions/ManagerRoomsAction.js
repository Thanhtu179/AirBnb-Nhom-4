import { managerRoomsService } from "../../services/ManagerRoomsService";
import { history } from '../../App';
import { SET_ARR_ROOM, SET_ARR_ROOM_BY_PANIGATION, SET_LOADING_ROOM, SET_ROOM_DATA_BY_ID } from "../Types/ManagerRoomsType";
import { closeDrawer } from "./AdminControlAction";


export const deleteRoomByIdAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await managerRoomsService.deleteRoom(id);
            if (result.status === 200) {
                alert('Xóa thành công');
                dispatch(getAllRoom());
                dispatch(closeDrawer());
            }
        } catch (error) {
            alert("Xóa không thành công")
        }

    }

}

export const addRoomAction = (roomInfo) => {
    return async (dispatch) => {
        try {
            const result = await managerRoomsService.createRoom(roomInfo);
            if (result.status === 200) {
                alert('Thêm phòng thành công');
                dispatch(getAllRoom());
                dispatch(closeDrawer());
            }
        } catch (error) {
            alert("Thêm phòng không thành công")
            console.log(error);
        }

    }

}

export const updateRoomByIdAction = (id, updateInfo) => {
    return async (dispatch) => {
        try {
            const result = await managerRoomsService.updateRoomInfo(id, updateInfo);
            if (result.status === 200) {
                alert('Cập nhật phòng thành công!');
                dispatch(getAllRoom());
                dispatch(closeDrawer());
            }
        } catch (error) {
            alert("Cập nhật không thành công có lỗi")
            console.log(error);
        }
    }
}

export const getRoomByIdAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await managerRoomsService.getRoomInfo(id);
            if (result.status === 200) {
                dispatch({
                    type: SET_ROOM_DATA_BY_ID,
                    roomData: result.data
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const getRoomByPagination = (pagination) => {
    return async (dispatch) => {
        try {
            const result = await managerRoomsService.getRoomListByPagination(pagination);
            if (result.status === 200) {
                dispatch({
                    type: SET_ARR_ROOM_BY_PANIGATION,
                    arrRoomByPanigation: result.data,
                    pagination
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const getAllRoom = () => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const result = await managerRoomsService.getAllRoom();
            if (result.status === 200) {
                dispatch({
                    type: SET_ARR_ROOM,
                    arrRoom: result.data
                })
            }
        } catch (error) {
            console.log(error);
        }
        setTimeout(() => {
            dispatch(setLoading(false));
        }, 500)
    }
}

export const setLoading = (loading) => {
    return async (dispatch) => {
        dispatch({ type: SET_LOADING_ROOM, loading })
    }
}

export const updateAvatarRoomById = (id, fromData) => {
    return async (dispatch) => {
        try {
            const result = await managerRoomsService.updateRoomAvatar(id, fromData);
            if (result.status === 200) {
                alert('Cập nhật phòng thành công!');
                dispatch(closeDrawer());
                dispatch(getAllRoom())
            }
        } catch (error) {
            alert("Cập nhật không thành công có lỗi")
            console.log(error);
        }
    }
}

