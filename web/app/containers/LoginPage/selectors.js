import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLogin = state => state.LoginPage || initialState;

const makeSelectError = () =>
  createSelector(
    selectLogin,
    LoginPage => LoginPage.error,
  );

export {
  makeSelectError
};
