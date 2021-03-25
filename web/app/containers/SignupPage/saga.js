import { call, put, takeLatest } from 'redux-saga/effects';
import { SIGNUP } from './constants';
import { signUpError } from './actions';
import request from 'utils/request';
import history from 'utils/history';
import config from '../../../config'

export function* signUpWorker(props) {
  const { userData } = props;
  const url = `${config.api_url}/register`;

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  };

  try {
    const response = yield call(request, url, options);
    localStorage.setItem('token', JSON.stringify(response.Authorization));
    history.push('/');
  } catch (err) {
    yield put(signUpError(err));
  }
}

export default function* SignUpSaga() {
  yield takeLatest(SIGNUP, signUpWorker);
}
