import {
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR
} from './constants';

export function signUp(userData) {
  return {
    type: SIGNUP,
    userData,
  };
}

export function signUpSuccess(response) {
  return {
    type: SIGNUP_SUCCESS,
    response,
  };
}

export function signUpError(error) {
  return {
    type: SIGNUP_ERROR,
    error
  };
}
