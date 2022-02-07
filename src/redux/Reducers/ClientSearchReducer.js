import { SET_SEARCH } from "./../../redux/Types/ClientSearchType";
const stateDefault = {
  searchRoom: {
    place: "",
    checkin: "",
    checkout: "",
    guests: 0,
    checkinString: "",
    checkoutString: "",
  },
};

export default (state = stateDefault, action) => {
  switch (action.type) {
    case SET_SEARCH: {
      state.searchRoom = action.data;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
