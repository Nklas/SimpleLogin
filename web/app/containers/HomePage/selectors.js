import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.HomePage || initialState;

const makeSelectUser = () =>
  createSelector(
    selectHome,
    HomePage => HomePage.user,
  );

export { selectHome, makeSelectUser };
