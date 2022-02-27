import {
  SET_SEARCH,
  SET_MENU_INDEX,
  CLICK_SEARCH_SCROLL,
  SCROLL_SCREEN,
} from "./../../redux/Types/ClientSearchType";
const stateDefault = {
  searchRoom: {
    place: "",
    checkin: "",
    checkout: "",
    guests: "",
    checkinString: "",
    checkoutString: "",
    guestsTotal: 0,
  },
  menuIndex: 1,
  clickSearchScroll: false,
  scroll: false,
};

export default (state = stateDefault, action) => {
  switch (action.type) {
    case SET_SEARCH: {
      state.searchRoom = action.data;
      return { ...state };
    }
    case SET_MENU_INDEX: {
      state.menuIndex = action.data;
      return { ...state };
    }
    case CLICK_SEARCH_SCROLL: {
      state.clickSearchScroll = action.data;
      return { ...state };
    }
    case SCROLL_SCREEN: {
      state.scroll = action.data;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
