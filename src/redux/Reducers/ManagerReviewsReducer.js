const initialState = {

}

export default (state = initialState, action) => {
    switch (action.type) {

        case "asd":
            return { ...state }

        default:
            return state
    }
}
