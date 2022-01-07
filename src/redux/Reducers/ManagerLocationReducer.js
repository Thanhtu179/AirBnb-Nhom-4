import { SET_ARR_LOCATIONS, SET_ARR_LOCATIONS_BY_PAGINATION, SET_LOCATION_DATA_BY_ID } from "../Types/ManagerLocationType"

const initialState = {
    arrLocation: [],
    locationData: {},
    arrLocationsByPagination: [],

}

export default (state = initialState, action) => {
    switch (action.type) {

        case SET_ARR_LOCATIONS: {
            state.arrLocation = action.arrLocation;
            return { ...state };
        }

        case SET_ARR_LOCATIONS_BY_PAGINATION: {
            console.log("vao r")
            state.arrLocationsByPagination = action.arrLocationsByPagination;
            return { ...state };
        }

        case SET_LOCATION_DATA_BY_ID: {
            state.locationData = action.locationData;
            return { ...state };
        }


        default:
            return state
    }
}
