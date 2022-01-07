import { createBrowserHistory } from 'history';
import { Route, Switch, Router } from 'react-router-dom';

import { AdminTemplate } from "./templates/AdminTemplate/AdminTemplate";
import ManagerLocation from './pages/ManagerLocation/ManagerLocation';
import ManagerRooms from "./pages/ManagerRooms/ManagerRooms";
import ManagerUsers from "./pages/ManagerUsers/ManagerUsers";
import Room from "./pages/Room/Room";
import ListRoom from "./pages/RoomList/ListRoom";
import UserInfo from "./pages/UserInfo/UserInfo";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";



export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <AdminTemplate exact path="/admin/locations" Component={ManagerLocation} />
        <AdminTemplate exact path="/admin/rooms" Component={ManagerRooms} />
        <AdminTemplate exact path="/admin/users" Component={ManagerUsers} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/" component={Home} />
        <Route exact path="/rooms/:id" component={Room} />
        <Route exact path="/list-room" component={ListRoom} />
        <Route exact path="/user/:id" component={UserInfo} />
      </Switch>
    </Router>
  );
}

export default App;
