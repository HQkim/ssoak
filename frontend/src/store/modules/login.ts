// ducks 패턴
import {
  delay,
  put,
  take,
  takeEvery,
  takeLatest,
  fork,
  all,
  call,
} from "redux-saga/effects";
import { kakaoLogin } from "../../apis/auth";
import { setApiHeaders } from "../../apis/instance";

function loginAPI(access_code: string) {
  return kakaoLogin(access_code);
}

// actions
const LOG_IN_REQUEST = "LOG_IN_REQUEST";
const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
const LOG_IN_FAILURE = "LOG_IN_FAILURE";

//Action 생성자
export const loginRequestAction = (payload: string) => {
  return {
    type: LOG_IN_REQUEST,
    payload: payload,
  };
};

//middleware
function* logInSaga(action: any) {
  try {
    console.log("saga / logIn / Request");
    const result = yield call(loginAPI, action.payload);
    // yield delay(2000);
    // console.log(result);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data.accessToken,
    });
  } catch (error: any) {
    console.log(error);
    yield put({
      type: LOG_IN_FAILURE,
    });
  }
}

function* watchLogin() {
  console.log("saga / watchLogin");
  yield takeLatest(LOG_IN_REQUEST, logInSaga);
}

export function* loginSaga() {
  yield all([fork(watchLogin)]);
}

//reducer
const login = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST: {
      console.log("reducer / 로그인 요청");
      return {
        ...state,
        logInLoading: true,
        logInDone: false,
        logInError: null,
      };
    }
    case LOG_IN_SUCCESS: {
      console.log("reducer / 로그인 완료");
      setApiHeaders();
      return {
        ...state,
        logInLoading: false,
        logInDone: true,
      };
    }
    case LOG_IN_FAILURE: {
      console.log("reducer / 로그인 실패");
      return {
        logInLoading: false,
        logInError: action.error,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default login;

//Types for typescript

type LoginState = {
  logInLoading: boolean;
  logInDone: boolean;
  logInError: null | boolean;
};

//initial state
const initialState: LoginState = {
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
};
