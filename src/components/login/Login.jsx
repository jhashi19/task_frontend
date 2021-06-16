import React, { useReducer } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { useCookies } from 'react-cookie';

import loginReducer from '../../reducers/loginReducer';
import {
  START_FETCH,
  FETCH_SUCCESS,
  ERROR_CATCHED,
  INPUT_LOGIN,
  INPUT_SIGNUP,
  TOGGLE_MODE
} from '../../actions/actionTypes';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    cursor: 'pointer',
  },
}));

const initialState = {
  isLoading: false,
  isLoginView: true,
  error: '',
  credentialsLogin: {
    username: '',
    password: '',
  },
  credentialsSignup: {
    username: '',
    password: '',
  },
};

const Login = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const [cookie, setCookie, removeCookie] = useCookies(['userToken']);

  const handelOnChangeCredentialsLogin = () => event => {
    dispatch({
      type: INPUT_LOGIN,
      field: event.target.name,
      payload: event.target.value,
    });
  };

  const handelOnChangeCredentialsSignup = () => event => {
    dispatch({
      type: INPUT_SIGNUP,
      field: event.target.name,
      payload: event.target.value,
    });
  };

  const loginOrSignup = async (event) => {
    event.preventDefault();
    if (state.isLoginView) {
      try {
        dispatch({ type: START_FETCH });

        const res = await axios.post('http://localhost:8000/api/v1/auth/jwt/create/', state.credentialsLogin, {
          headers: { 'Content-Type': 'application/json' }
        });

        const userToken = res.data.token;
        setCookie('userToken', userToken, { path: '/' });
        userToken ? window.location.href = '/tasks' : window.location.href = '/';

        dispatch({ type: FETCH_SUCCESS });

      } catch (e) {
        console.error(e.stack);
        dispatch({ ERROR_CATCHED });
      };
    } else {
      try {
        dispatch({ type: START_FETCH });
        await axios.post('http://localhost:8000/api/v1/accounts/create/', state.credentialsSignup, {
          headers: { 'Content-Type': 'application/json' }
        });

        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: TOGGLE_MODE });

      } catch (e) {
        console.error(e.stack);
        dispatch({ ERROR_CATCHED });
      };
    };
  };

  const toggleView = () => {
    dispatch({ type: TOGGLE_MODE });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {state.isLoading && <CircularProgress />}
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {state.isLoginView ? 'Log In' : 'Sign Up'}
        </Typography>
        <form className={classes.form} onSubmit={loginOrSignup}>
          {state.isLoginView ?
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
              value={state.credentialsLogin.username}
              onChange={handelOnChangeCredentialsLogin()}
            />
            :
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
              value={state.credentialsSignup.username}
              onChange={handelOnChangeCredentialsSignup()}
            />
          }
          {state.isLoginView ?
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={state.credentialsLogin.password}
              onChange={handelOnChangeCredentialsLogin()}
            />
            :
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={state.credentialsSignup.password}
              onChange={handelOnChangeCredentialsSignup()}
            />
          }
          {state.isLoginView ?
            !state.credentialsLogin.username || !state.credentialsLogin.password ?
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled
              >
                Log In
              </Button>
              :
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Log In
              </Button>
            :
            !state.credentialsSignup.username || !state.credentialsSignup.password ?
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled
              >
                Sign Up
              </Button>
              :
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
          }
          <Grid container>
            <Grid item>
              <span className={classes.link} href="#" variant="body2" onClick={toggleView}>
                {state.isLoginView ? "Don't have an account? Sign Up" : "Back to Log in?"}
              </span>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Login;
