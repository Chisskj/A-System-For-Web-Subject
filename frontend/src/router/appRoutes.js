import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import User from '../pages/User';
import routes from '../constants/route';

export default [
  {
    path: routes.LOGIN,
    component: Login,
    exact: true,
    restricted: true,
    isPrivate: false,
  },
  {
    path: routes.REGISTER,
    component: Register,
    exact: true,
    restricted: true,
    isPrivate: false,
  },
  {
    path: routes.HOME,
    component: Home,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: routes.USER,
    component: User,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
];
