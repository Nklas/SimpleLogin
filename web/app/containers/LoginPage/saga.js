import { call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN } from './constants';
import { loginError } from './actions';
import request from 'utils/request';
import history from 'utils/history'
import config from '../../../config'

export function* loginWorker(props) {
  const { userCredentials } = props;
  const url = `${config.api_url}/login`;

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userCredentials),
  };

  try {
    const response = yield call(request, url, options);
    localStorage.setItem('token', JSON.stringify(response.Authorization));
    history.push('/');
  } catch (error) {
    yield put(loginError(error));
  }
}

export default function* LoginSaga() {
  yield takeLatest(LOGIN, loginWorker);
}
