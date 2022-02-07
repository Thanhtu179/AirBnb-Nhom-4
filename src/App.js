import { createBrowserHistory } from "history";
import { Route, Switch, Router } from "react-router-dom";

import { AdminTemplate } from "./templates/AdminTemplate/AdminTemplate";
import ManagerLocation from "./pages/ManagerLocation/ManagerLocation";
import ManagerRooms from "./pages/ManagerRooms/ManagerRooms";
import ManagerUsers from "./pages/ManagerUsers/ManagerUsers";
import UserInfo from "./pages/UserInfo/UserInfo";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import LocationInfo from "./pages/LocationInfo/LocationInfo";
import RoomInfo from "./pages/RoomInfo/RoomInfo";
import { HomeTemplate } from "./templates/ClientTemplate/HomeTemplate";
import HomePage from "./pages/Home/HomePage";
import HomeMobile from "./pages/Home/HomeMobile";
import { ListRoomTemplate } from "./templates/ClientTemplate/ListRoomTemplate";
import { ListRoomPage } from "./pages/RoomList/ListRoomPage";
import { ListRoomMobile } from "./pages/RoomList/ListRoomMobile";
import RoomDetailPage from "./pages/RoomDetail/RoomDetailPage";
import { RoomDetailTemplate } from "./templates/ClientTemplate/RoomDetailTemplate.jsx";
import RoomDetailMobile from "./pages/RoomDetail/RoomDetailMobile";

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <AdminTemplate
          exact
          path="/admin/locations"
          Component={ManagerLocation}
        />
        <AdminTemplate exact path="/admin/rooms" Component={ManagerRooms} />
        <AdminTemplate exact path="/admin/users" Component={ManagerUsers} />
        <AdminTemplate exact path="/admin" Component={ManagerUsers} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <HomeTemplate
          exact
          path="/home"
          Component={HomePage}
          MobileComponent={HomeMobile}
        />
        <HomeTemplate
          exact
          path="/"
          Component={HomePage}
          MobileComponent={HomeMobile}
        />
        <Route exact path="/rooms/:id" component={RoomInfo} />
        <Route exact path="/users/:id" component={UserInfo} />
        <Route exact path="/locations/:id" component={LocationInfo} />
        <ListRoomTemplate
          exact
          path="/list-room/"
          Component={ListRoomPage}
          MobileComponent={ListRoomMobile}
        />
        <RoomDetailTemplate
          exact
          path="/room-detail/:id"
          Component={RoomDetailPage}
          MobileComponent={RoomDetailMobile}
        />
      </Switch>
    </Router>
  );
}

export default App;
