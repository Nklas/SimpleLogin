import produce from 'immer';
import { FETCH_CURRENT_USER_SUCCESS} from './constants';

export const initialState = {
  user: null,
};

/* eslint-disable default-case, no-param-reassign */
const HomePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_CURRENT_USER_SUCCESS:
        draft.user = action.response;
        break;
    }
  });

export default HomePageReducer;
