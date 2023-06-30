import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import { getCookie } from '../utils/cookie';
import routes from '../constants/route';
import appRoutes from './appRoutes';
import actions from '../redux/actions';

const App = () => {
  const dispatch = useDispatch();
  const { accessToken, verifying } = useSelector((state) => state.auth);
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    if (!accessToken) {
      const accessTokenFromCookie = getCookie('accessToken');
      if (accessTokenFromCookie) {
        dispatch(actions.auth.verifyToken(accessTokenFromCookie));
      }
    }
    setIsFirstTime(false);
  }, [dispatch, accessToken]);

  if (isFirstTime || verifying) {
    return <CircularProgress key="loading" />;
  }

  return (
    <BrowserRouter>
      <Switch>
        {appRoutes.map(
          ({
            path,
            exact = true,
            component: Component,
            isPrivate = false,
            ...rest
          }) => {
            if (!isPrivate) {
              return (
                <PublicRoute
                  key={path}
                  exact={exact}
                  path={path}
                  Component={Component}
                  {...rest}
                />
              );
            }
            return (
              <PrivateRoute
                key={path}
                exact={exact}
                path={path}
                Component={Component}
                {...rest}
              />
            );
          },
        )}
        <Redirect to={routes.HOME} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
