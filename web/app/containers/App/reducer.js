import produce from 'immer';

// The initial state of the App
export const initialState = {
  loading: false,
  token: null,
  error: false,
  user: null,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {}
  });

export default appReducer;
