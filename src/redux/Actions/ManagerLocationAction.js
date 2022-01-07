import { managerLocationService } from "../../services/ManagerLocationService";
import { SET_ARR_LOCATIONS } from "../Types/ManagerLocationType";


export const getAllLocations = () => {
    return async (dispatch) => {
        try {
            const result = await managerLocationService.getAllLocations();
            if (result.status === 200) {
                await dispatch({
                    type: SET_ARR_LOCATIONS,
                    arrLocation: result.data
                })
            }
        } catch (err) {
            console.log(err);
        }
    }
}

