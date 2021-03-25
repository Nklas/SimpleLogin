import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_CURRENT_USER } from './constants';
import { fetchCurrentUserSuccess, fetchCurrentUserError } from './actions';
import request from 'utils/request';
import history from 'utils/history';
import config from '../../../config'

export function* fetchCurrentUserWorker() {
  const url = `${config.api_url}/me`;
  let token;

  try {
    token = JSON.parse(localStorage.getItem('token'));
  } catch (e) {
    history.push('/login');
  }

  if (!token) {
    history.push('/login');
  }

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = yield call(request, url, options);
    yield put(fetchCurrentUserSuccess(response));
  } catch (error) {
    yield put(fetchCurrentUserError(error));
  }
}

export default function* HomePageSaga() {
  yield takeLatest(FETCH_CURRENT_USER, fetchCurrentUserWorker);
}
