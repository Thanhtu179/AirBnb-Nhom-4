import { combineReducers, createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import ManagerLocationReducer from "./Reducers/ManagerLocationReducer";
import ManagerReviewsReducer from "./Reducers/ManagerReviewsReducer";
import ManagerRoomsReducer from "./Reducers/ManagerRoomsReducer";
import ManagerTicketsReducer from "./Reducers/ManagerTicketsReducer";
import ManagerUsersReducer from "./Reducers/ManagerUsersReducer";
import AdminControlReducer from "./Reducers/AdminControlReducer";
import ClientSearchReducer from "./Reducers/ClientSearchReducer";

const rootReducer = combineReducers({
  ManagerLocationReducer,
  ManagerReviewsReducer,
  ManagerRoomsReducer,
  ManagerTicketsReducer,
  ManagerUsersReducer,
  AdminControlReducer,
  ClientSearchReducer,
});

const store = createStore(rootReducer, applyMiddleware(reduxThunk));
export default store;
