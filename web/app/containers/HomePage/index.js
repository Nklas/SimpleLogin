import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Button from '@material-ui/core/Button';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { fetchCurrentUser } from './actions';
import { makeSelectUser } from './selectors';
import reducer from './reducer';
import saga from './saga';
import history from 'utils/history';
import { makeStyles } from "@material-ui/core/styles/index";

const useStyles = makeStyles((theme) => ({
  text: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    marginLeft: '30px'
  },
}));

const key = 'HomePage';

export function HomePage({ fetchCurrentUser, user}) {
  const classes = useStyles();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <div className={classes.text}>
        <div>User Details: </div>
        <div>
          {user && <div>
            <h5>Email: {user.email}</h5>
            <h5>Real name: {user.real_name}</h5>
            <h5>Birth date: {user.birth_date}</h5>
            <h5>Country: {user.country}</h5>
            <h5>Created At: {user.createdAt}</h5>
            <h5>id: {user.id}</h5>
            <h5>Login: {user.login}</h5>
            <h5>Real name: {user.real_name}</h5>

            <Button
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => {
                localStorage.removeItem('token');
                history.push('/login');
              }}
            >
              Logout
            </Button>

          </div>}
        </div>
      </div>


    </article>
  );
}

HomePage.propTypes = {
  fetchCurrentUser: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

export function mapDispatchToProps(dispatch) {
  return {
    fetchCurrentUser: () => dispatch(fetchCurrentUser()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);