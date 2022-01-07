import { SET_ARR_LOCATIONS } from "../Types/ManagerLocationType"

const initialState = {
    arrLocation: []
}

export default (state = initialState, action) => {
    switch (action.type) {

        case SET_ARR_LOCATIONS: {
            state.arrLocation = action.arrLocation;
            return { ...state };
        }

        default:
            return state
    }
}
