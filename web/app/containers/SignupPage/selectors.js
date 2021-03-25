import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSignUp = state => state.SignUpPage || initialState;

const makeSelectError = () =>
  createSelector(
    selectSignUp,
    SignUpPage => SignUpPage.error,
  );

export { makeSelectError };
