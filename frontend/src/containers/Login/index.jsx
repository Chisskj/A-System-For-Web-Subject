import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons';
// import { GoogleLogin } from 'react-google-login';
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import actions from '../../redux/actions';
import useStyles from './index.style';
import loginType from '../../constants/loginType';
import { validateEmail } from '../../utils/string';

const Login = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const dispatch = useDispatch();
  const { isLoggingIn, message } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isLoggingIn) return;
    if (message && typeof message === 'string') {
      enqueueSnackbar(message, { variant: 'error' });
    }
  }, [isLoggingIn, message, enqueueSnackbar]);

  // const handleLoginFailureGoogle = (res) => {
  //   enqueueSnackbar(res, { variant: 'error' });
  // };

  // const handleLoginSuccessGoogle = async (res) => {
  //   const { tokenId } = res;
  //   dispatch(actions.auth.login(loginType.LOGIN_GOOGLE, { tokenId }));
  // };

  // const handleLoginFacebook = async (res) => {
  //   const { accessToken, userID } = res;
  //   dispatch(
  //     actions.auth.login(loginType.LOGIN_FACEBOOK, { accessToken, userID }),
  //   );
  // };

  const validateLogin = () => {
    let countError = 0;
    if (email.length === 0) {
      setEmailError(true);
      countError += 1;
    } else if (!validateEmail(email)) {
      setEmailError(true);
      countError += 1;
    } else {
      setEmailError(false);
    }
    if (password.length === 0) {
      setPasswordError(true);
      countError += 1;
    } else {
      setPasswordError(false);
    }
    return countError <= 0;
  };

  const handleLogin = async () => {
    if (!validateLogin()) return;
    dispatch(actions.auth.login(loginType.LOGIN, { email, password }));
  };

  const onKeyPress = async (e) => {
    if (e.key === 'Enter') {
      try {
        await handleLogin();
        // Xử lý đăng nhập thành công ở đây
      } catch (error) {
        // Handle login error here
      }
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng nhập
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onKeyDown={onKeyPress}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              error={emailError}
              helperText={emailError ? 'Email is required' : ''}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type="password"
              id="password"
              autoComplete="current-password"
              onKeyDown={onKeyPress}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              error={passwordError}
              helperText={passwordError ? 'Password is required' : ''}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              Đăng nhập
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/register" variant="body2">
                  Tạo tài khoản
                </Link>
              </Grid>
            </Grid>
            <Box display="flex" mt={1} alignItems="center">
              <div className={classes.divider} />
              <Typography gutterBottom align="center" variant="subtitle1">
                Hoặc
              </Typography>
              <div className={classes.divider} />
            </Box>

            {/* <Grid container spacing={3}>
              <Grid item xs={6}>
                <GoogleLogin
                  clientId="802105279409-3f4hr8psra01jd28d9rhuupgp64658k4.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <Button
                      fullWidth
                      variant="outlined"
                      color="primary"
                      className={classes.submit}
                      startIcon={
                        // eslint-disable-next-line react/jsx-wrap-multilines
                        <Avatar
                          style={{
                            height: '20px',
                            width: '20px',
                          }}
                          variant="square"
                          src="https://res.cloudinary.com/dfbongzx0/image/upload/v1621771943/m33izryay4mzslavxmyk.png"
                        />
                      }
                      onClick={renderProps.onClick}
                    >
                      Google
                    </Button>
                  )}
                  buttonText="Login"
                  onSuccess={handleLoginSuccessGoogle}
                  onFailure={handleLoginFailureGoogle}
                  cookiePolicy="single_host_origin"
                />
              </Grid>
              <Grid item xs={6}>
                <FacebookLogin
                  appId="856230045423715"
                  // eslint-disable-next-line react/jsx-boolean-value
                  autoLoad={false}
                  callback={handleLoginFacebook}
                  render={(renderProps) => (
                    <Button
                      fullWidth
                      variant="outlined"
                      color="primary"
                      className={classes.submit}
                      startIcon={
                        // eslint-disable-next-line react/jsx-wrap-multilines
                        <Avatar
                          style={{
                            height: '20px',
                            width: '20px',
                          }}
                          variant="square"
                          src="https://res.cloudinary.com/dfbongzx0/image/upload/v1621771959/idn7xi1tw5blhrj8zoxk.png"
                        />
                      }
                      onClick={renderProps.onClick}
                    >
                      Facebook
                    </Button>
                  )}
                />
              </Grid>
            </Grid> */}
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
