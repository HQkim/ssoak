// ducks 패턴
import { delay, put, take, takeEvery, takeLatest } from "redux-saga/effects";

// actions
const LOAD_DATA = "detail/LOAD_DATA" as const;
const LOAD_DATA_ASYNC = "detail/LOAD_DATA_ASYNC" as const;

//Action 생성자
export const loadData = (payload: any) => ({
  type: LOAD_DATA,
  payload: payload,
});

export const loadDataAsync = (payload: any) => ({
  type: LOAD_DATA_ASYNC,
  payload: payload,
});

//middleware
function* loadDataSaga(action: any) {
  // console.log(action);
  yield put(loadData(true));
  yield delay(1000);
  yield put(loadData(false));
}

export function* detailSaga() {
  yield takeLatest(LOAD_DATA_ASYNC, loadDataSaga);
}

//reducer
function detail(
  state: DetailState = initialState,
  action: DetailAction,
): DetailState {
  switch (action.type) {
    case LOAD_DATA:
      return { isLoading: action.payload };
    default:
      return state;
  }
}

export default detail;

//Types for typescript
type DetailAction = ReturnType<typeof loadData>;

type DetailState = {
  isLoading: boolean;
};

//initial state
const initialState: DetailState = {
  isLoading: true,
};
