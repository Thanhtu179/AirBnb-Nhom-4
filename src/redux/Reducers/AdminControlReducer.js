

import { OPEN_DRAWER, CLOSE_DRAWER } from "../Types/AdminControlType"

const initialState = {
    modalDrawer: {
        drawerVisible: false,
        drawerContent: <p>Default</p>,
        drawerTitle: "Test",
    }
}

export default (state = initialState, action) => {
    switch (action.type) {

        case OPEN_DRAWER: {
            state.modalDrawer.drawerTitle = action.title;
            state.modalDrawer.drawerContent = action.content;
            state.modalDrawer.drawerVisible = true;
            return { ...state }
        }

        case CLOSE_DRAWER: {
            state.modalDrawer.drawerVisible = false;
            return { ...state }
        }

        default:
            return state
    }
}
