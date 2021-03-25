import produce from 'immer';
import {
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  user: null,
  error: null,
};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SIGNUP:
        draft.user = action.payload;
        break;
      case SIGNUP_SUCCESS:
        draft.user = action.payload;
        break;
      case SIGNUP_ERROR:
        draft.error = action.error.message;
        break;
    }
  });

export default loginReducer;
