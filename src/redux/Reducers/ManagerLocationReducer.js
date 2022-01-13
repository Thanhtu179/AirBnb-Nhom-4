import { SET_ARR_LOCATIONS, SET_ARR_LOCATIONS_BY_PAGINATION, SET_LOADING_LOCATION, SET_LOCATION_DATA_BY_ID } from "../Types/ManagerLocationType"

const initialState = {
    arrLocation: [],
    locationData: {},
    arrLocationsByPagination: [],
    loading: false,

}

export default (state = initialState, action) => {
    switch (action.type) {

        case SET_ARR_LOCATIONS: {
            state.arrLocation = action.arrLocation;
            return { ...state };
        }

        case SET_ARR_LOCATIONS_BY_PAGINATION: {
            state.arrLocationsByPagination = action.arrLocationsByPagination;
            return { ...state };
        }

        case SET_LOCATION_DATA_BY_ID: {
            state.locationData = action.locationData;
            return { ...state };
        }
        case SET_LOADING_LOCATION: {
            return { ...state, loading: action.loading };
        }

        default:
            return state
    }
}
