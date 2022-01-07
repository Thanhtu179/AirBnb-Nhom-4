import { SET_ARR_ROOM, SET_ARR_ROOM_BY_PANIGATION, SET_ROOM_DATA_BY_ID } from "../Types/ManagerRoomsType";

const initialState = {
    roomData: {},
    arrRoom: [],
    arrRoomByPanigation: [],
}

export default (state = initialState, action) => {
    switch (action.type) {

        case SET_ROOM_DATA_BY_ID: {
            state.roomData = action.roomData;
            return { ...state }
        }

        case SET_ARR_ROOM: {
            state.arrRoom = action.arrRoom;
            return { ...state }
        }

        case SET_ARR_ROOM_BY_PANIGATION: {
            state.arrRoomByPanigation = action.arrRoomByPanigation;
            return { ...state }
        }

        default:
            return state
    }
}
