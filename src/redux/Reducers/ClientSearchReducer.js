const stateDefault = {
  placeSearch: {
    place: "",
    checkin: "",
    checkout: "",
  },
};

export default ClientSearchReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "": {
      return { ...state };
    }
    default:
      return { ...state };
  }
};
