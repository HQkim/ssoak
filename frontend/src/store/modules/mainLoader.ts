// ducks 패턴
import { delay, put, take, takeEvery, takeLatest } from "redux-saga/effects";

// actions
const DATA_FETCH = "main/DATA_FETCH" as const;
const DATA_FETCH_ASYNC = "main/DATA_FETCH_ASYNC" as const;

//Action 생성자

export const dataFetch = (status: boolean) => ({
  type: DATA_FETCH,
  payload: status,
});

export const dataFetchAsync = (status: boolean) => ({
  type: DATA_FETCH_ASYNC,
  payload: status,
});

//middleware
function* mainSaga(action: any) {
  // console.log(action);
  yield put(dataFetch(true));
  yield delay(1000);
  yield put(dataFetch(false));
}

export function* loaderSaga() {
  yield takeLatest(DATA_FETCH_ASYNC, mainSaga);
}

//reducer
function counter(
  state: LoaderState = initialState,
  action: LoaderAction,
): LoaderState {
  switch (action.type) {
    case DATA_FETCH:
      return { isLoading: action.payload };
    default:
      return state;
  }
}

export default counter;

//Types for typescript
type LoaderAction =
  | ReturnType<typeof dataFetch>
  | ReturnType<typeof dataFetchAsync>;

type LoaderState = {
  isLoading: boolean;
};

//initial state
const initialState: LoaderState = {
  isLoading: true,
};
