import produce from 'immer';
import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';

// The initial state of the App
export const initialState = {
  user: null,
  error: null,
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN:
        draft.user = action.payload;
        break;
      case LOGIN_SUCCESS:
        draft.user = action.payload;
        break;
      case LOGIN_ERROR:
        draft.error = action.error.message;
        break;
    }
  });

export default loginPageReducer;
