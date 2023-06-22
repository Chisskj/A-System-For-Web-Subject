/* eslint-disable no-case-declarations */
import { put, all, takeLatest, takeEvery, call} from 'redux-saga/effects';
import apis from '../../apis';
import actions from '../actions';
import { setCookie } from '../../utils/cookie';
import loginType from '../../constants/loginType';

function* loginSaga(data) {
  try {
    const A_WEEK = 7 * 24 * 60 * 60 * 1000;
    let res = null;
    switch (data && data.loginType) {
      case loginType.LOGIN_GOOGLE:
        const { tokenId } = data;
        res = yield call(apis.auth.loginByGoogle, tokenId);
        break;
      case loginType.LOGIN_FACEBOOK:
        const { accessToken, userID } = data;
        res = yield call(apis.auth.loginByFacebook, { accessToken, userID });
        break;
      default:
        const { email, password } = data;
        res = yield call(apis.auth.login, email, password);
    }
    const jsonObject = JSON.parse(res);
    if (jsonObject.status) {
      const { access_token, user } = jsonObject.result;
      setCookie('accessToken', access_token, A_WEEK);
      yield put(actions.auth.loginSuccess(access_token, user));
    } else {
      const { code, message } = jsonObject;
      yield put(actions.auth.loginFailure(code, message));
    }
  } catch (error) {
    yield put(actions.auth.loginFailure());
  }
}

function* verifyTokenSaga({ accessToken }) {
  try {
    const data = yield apis.auth.verify(accessToken);
    const data1 = JSON.parse(data);
    if (!data1.status) throw new Error();
    const { user } = data1.result;
    if (user) {
      yield put(actions.auth.verifyTokenSuccess(accessToken, user));
    } else {
      yield put(actions.auth.verifyTokenFailure());
    }
  } catch (error) {
    yield put(actions.auth.verifyTokenFailure());
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.auth.actionTypes.LOGIN, loginSaga),
    takeEvery(actions.auth.actionTypes.VERIFY_TOKEN, verifyTokenSaga),
  ]);
}
