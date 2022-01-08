import { OPEN_DRAWER, CLOSE_DRAWER } from "../Types/AdminControlType"
import AddLocation from "../../pages/ManagerLocation/AddLocation/AddLocation"


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
            state.modalDrawer.drawerTitle = "Title Default";
            state.modalDrawer.drawerContent = <p>Default</p>;
            return { ...state }
        }

        default:
            return state
    }
}
