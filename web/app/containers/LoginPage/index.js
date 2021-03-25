import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import history from 'utils/history';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { login } from './actions';
import { makeSelectError} from './selectors';
import reducer from './reducer';
import saga from './saga';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 19, 2),
    textAlign: 'center'
  },
}));

const key = 'LoginPage';

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function LoginPage(props) {
  const classes = useStyles();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [state, setState] = useState({
    email_or_login: '',
    password: '',
  });
  const { email_or_login, password } = state;

  useEffect(() => {
    //reset password field
    setState({...state, password: ''});
  }, [props.error]);

  const handleChange = (name, value) => setState({...state, [name]: value});

  const handleLogin = () => {
    const isEmail = validateEmail(email_or_login);
    props.login({
      [isEmail ? 'email': 'login'] : email_or_login,
      password
    })
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <div style={{color: 'red'}}>{props.error}</div>
          <TextField
            margin="normal"
            require
            required
            fullWidth
            id="email_or_login"
            name="email_or_login"
            label="email or login"
            value={email_or_login}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            variant="outlined"
            autoFocus
          />
          <TextField
            type="password"
            id="password"
            autoComplete="current-password"
            margin="normal"
            required
            fullWidth
            name="password"
            label="password"
            value={password}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            history.push('/signup');
          }}
        >
          Sign up
        </Button>

      </div>
    </Container>
  );
}

LoginPage.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  login: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    login: userCredentials => dispatch(login(userCredentials)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(LoginPage);
