// ducks 패턴
import { delay, put, take, takeEvery, takeLatest } from "redux-saga/effects";

// actions
const SHOW_LOADER = "main/SHOW_LOADER" as const;
const SHOW_LOADER_ASYNC = "main/SHOW_LOADER_ASYNC" as const;

//Action 생성자

export const showLoader = (status: boolean) => ({
  type: SHOW_LOADER,
  payload: status,
});

export const showLoaderAsync = (status: boolean) => ({
  type: SHOW_LOADER_ASYNC,
  payload: status,
});

//middleware
function* showLoaderSaga(action: any) {
  // console.log(action);
  yield put(showLoader(true));
  yield delay(4000);
  yield put(showLoader(false));
}

export function* loaderSaga() {
  yield takeLatest(SHOW_LOADER_ASYNC, showLoaderSaga);
}

//reducer
function counter(
  state: LoaderState = initialState,
  action: LoaderAction,
): LoaderState {
  switch (action.type) {
    case SHOW_LOADER:
      return { isLoading: action.payload };
    default:
      return state;
  }
}

export default counter;

//Types for typescript
type LoaderAction = ReturnType<typeof showLoader>;

type LoaderState = {
  isLoading: boolean;
};

//initial state
const initialState: LoaderState = {
  isLoading: true,
};
