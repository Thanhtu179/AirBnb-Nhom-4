import { managerLocationService } from "../../services/ManagerLocationService";
import { SET_ARR_LOCATIONS, SET_ARR_LOCATIONS_BY_PAGINATION, SET_LOCATION_DATA_BY_ID } from "../Types/ManagerLocationType";
import { closeDrawer } from "./AdminControlAction";


export const deleteLocationByIdAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await managerLocationService.deleteLocation(id)
            if (result.status === 200) {
                alert('Xóa thành công');
                dispatch(closeDrawer());
                window.location.reload();
            }
        } catch (error) {
            alert("Xóa không thành công")
        }

    }

}

export const addLocationAction = (locationInfo) => {
    return async (dispatch) => {
        try {
            const result = await managerLocationService.createLocation(locationInfo)
            if (result.status === 200) {
                alert('Thêm phòng thành công');
                dispatch(closeDrawer());
                window.location.reload();
            }
        } catch (error) {
            alert("Thêm phòng không thành công")
            console.log(error);
        }

    }

}

export const updateLocationByIdAction = (id, updateInfo) => {
    return async (dispatch) => {
        try {
            const result = await managerLocationService.updateLocationByIdAction(id, updateInfo)
            if (result.status === 200) {
                alert('Cập nhật phòng thành công!');
                dispatch(closeDrawer());
                window.location.reload();
            }
        } catch (error) {
            alert("Cập nhật không thành công có lỗi")
            console.log(error);
        }
    }
}

export const getLocationByIdAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await managerLocationService.getLocationInfo(id)
            if (result.status === 200) {
                dispatch({
                    type: SET_LOCATION_DATA_BY_ID,
                    locationData: result.data
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const getLocationListByPagination = (pagination) => {
    return async (dispatch) => {
        try {
            const result = await managerLocationService.getLocationListByPagination(pagination);
            if (result.status === 200) {
                dispatch({
                    type: SET_ARR_LOCATIONS_BY_PAGINATION,
                    arrLocationsByPagination: result.data,
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const getAllLocations = () => {
    return async (dispatch) => {
        try {
            const result = await managerLocationService.getAllLocations();
            if (result.status === 200) {
                dispatch({
                    type: SET_ARR_LOCATIONS,
                    arrLocation: result.data
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}





