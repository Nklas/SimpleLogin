import {
  FETCH_CURRENT_USER,
  FETCH_CURRENT_USER_SUCCESS,
  FETCH_CURRENT_USER_ERROR
} from './constants';

export function fetchCurrentUser() {
  return {
    type: FETCH_CURRENT_USER,
  };
}

export function fetchCurrentUserSuccess(response) {
  return {
    type: FETCH_CURRENT_USER_SUCCESS,
    response,
  };
}

export function fetchCurrentUserError(error) {
  return {
    type: FETCH_CURRENT_USER_ERROR,
    error
  };
}