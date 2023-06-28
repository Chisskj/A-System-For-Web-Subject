import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Highcharts from 'highcharts';
import './index.css';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import * as serviceWorker from './serviceWorker';

import './languages';
import Router from './router';
import store from './redux/store';

window.Highcharts = Highcharts;

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <Provider store={store()}>
        <SnackbarProvider maxSnack={3}>
          <Router />
        </SnackbarProvider>
      </Provider>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
