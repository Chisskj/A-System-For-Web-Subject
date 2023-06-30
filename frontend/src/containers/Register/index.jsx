/* eslint-disable no-plusplus */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Link,
  Grid,
  Typography,
} from '@material-ui/core';
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons';
import useStyles from './index.style';
import apis from '../../apis';
import { validateEmail } from '../../utils/string';

const Register = () => {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [userError, setUserError] = useState({
    name: '',
    email: '',
    password: '',
  });

  const validateRegister = () => {
    let countError = 0;
    if (user.name.trim().length === 0) {
      setUserError((prev) => ({
        ...prev,
        name: 'Name is required',
      }));
      countError++;
    }

    if (user.email.trim().length === 0) {
      setUserError((prev) => ({ ...prev, email: 'Email is required' }));
      countError++;
    } else if (!validateEmail(user.email)) {
      setUserError((prev) => ({ ...prev, email: 'Invalid email' }));
      countError++;
    }

    if (user.password.trim().length === 0) {
      setUserError((prev) => ({ ...prev, password: 'Password is required' }));
      countError++;
    }

    return countError === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateRegister()) return;

    try {
      const data = await apis.auth.register({ ...user });
      const { status, message } = JSON.parse(data);
      if (status) {
        enqueueSnackbar('Register success', { variant: 'success' });
        history.push('/login');
      } else {
        enqueueSnackbar(message || 'Register failed', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('An error occurred', { variant: 'error' });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    setUserError((prevUserError) => ({
      ...prevUserError,
      [name]: '',
    }));
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
            Đăng kí
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSignUp}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="name"
              label="Họ và tên"
              name="name"
              autoComplete="name"
              value={user.name}
              onChange={handleInputChange}
              error={!!userError.name}
              helperText={userError.name}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={user.email}
              onChange={handleInputChange}
              error={!!userError.email}
              helperText={userError.email}
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
              value={user.password}
              onChange={handleInputChange}
              error={!!userError.password}
              helperText={userError.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Đăng kí
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Bạn đã có tài khoản?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Register;
