import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { signUp } from './actions';
import { makeSelectError } from './selectors';
import reducer from './reducer';
import saga from './saga';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import history from 'utils/history';
import config from '../../../config'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(6),
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
    margin: '26px 36% 26px',
    minWidth: 110,
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
  textField: {
    margin: theme.spacing(1),
    width: '100%',
  }
}));

const key = 'SignUpPage';

export function SignupPage(props) {
  const classes = useStyles();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [state, setState] = useState({
    email: '',
    login: '',
    real_name: '',
    password: '',
    country: null,
    birth_date: '',
    checkbox: false,
  });

  const { email, login, real_name, country, checkbox, password, birth_date } = state;

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function fetchCounties() {
      const url = `${config.api_url}/country`;
      let response = await fetch(url);
      response = await response.json();
      setCountries(response);
    }

    fetchCounties()
  }, []);

  useEffect(() => {
    //reset password field
    setState({...state, password: ''});
  }, [props.error]);

  const handleChange = (name, value) => {
    setState({
      ...state, [name]: value
    })
  };

  const handleSignUp = () => {
    props.signUp({
      email, login,
      real_name,
      password,
      country : country && country.name,
      birth_date,
      checkbox
    })
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <div style={{color: 'red'}}>{props.error}</div>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            label="email"
            value={email}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            variant="outlined"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="login"
            name="login"
            label="login"
            value={login}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            variant="outlined"
            autoComplete="login"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="real_name"
            name="real_name"
            label="real_name"
            value={real_name}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            variant="outlined"
            autoComplete="realName"
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
          <TextField
            name="birth_date"
            id="date"
            label="Birthday"
            type="date"
            required
            value={birth_date}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Autocomplete
            id="country"
            options={countries}
            getOptionLabel={(option) => option.name}
            value={country}
            renderInput={(params) => <TextField {...params} name="country" label="Country" variant="outlined" />}
            onChange={(e, newValue) => {
              handleChange('country', newValue);
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="checkbox"
                checked={checkbox}
                onChange={() => setState({...state, checkbox: !checkbox})}
              />
            }
            label="Agree with terms and conditions."
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignUp}
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            history.push('/login');
          }}
        >
          Sign In
        </Button>

      </div>
    </Container>
  );
}

SignupPage.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool, PropTypes.string]),
  signUp: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    signUp: userData => dispatch(signUp(userData)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(SignupPage);
