// ducks 패턴
import { delay, put, call, takeEvery, takeLatest } from "redux-saga/effects";
import { detailAuction } from "../../apis/auctionApi";
import axios from "axios";
const BASE_URL = "https://k6a207.p.ssafy.io/api/v1";
// actions
const LOAD_DATA = "detail/LOAD_DATA" as const;
const LOAD_DATA_ASYNC = "detail/LOAD_DATA_ASYNC" as const;
const LOAD_SUCCESS = "detail/LOAD_SUCCESS" as const;
const DATA_RESET = "detail/DATA_RESET" as const;

//Action 생성자
export const loadData = (payload: any) => ({
  type: LOAD_DATA,
  payload: payload,
});

export const loadDataAsync = (payload: any) => ({
  type: LOAD_DATA_ASYNC,
  payload: payload,
});

export const loadSuccess = (payload: any) => ({
  type: LOAD_SUCCESS,
  payload,
});

export const dataReset = () => ({
  type: DATA_RESET,
});

//middleware
function* loadDataSaga(action: any) {
  console.log(action);
  yield put(loadData(true));
  try {
    const result = yield call(detailAuction, action.payload);
    console.log(result);
    yield delay(1000);
    yield put(loadSuccess(result));
  } catch (error) {
    // yield put(loadError(error.response))
    console.log(error);
  } finally {
    yield put(loadData(false));
  }
}

export function* detailSaga() {
  yield takeLatest(LOAD_DATA_ASYNC, loadDataSaga);
}

//reducer
function detail(
  state: DetailState = initialState,
  action: DetailAction
): DetailState {
  switch (action.type) {
    case LOAD_DATA:
      return { ...state, isLoading: action.payload };
    case LOAD_SUCCESS:
      return { ...state, item: action.payload };
    case DATA_RESET:
      return { ...state, item: [] };
    default:
      return state;
  }
}

export default detail;

//Types for typescript
type DetailAction =
  | ReturnType<typeof loadData>
  | ReturnType<typeof dataReset>
  | ReturnType<typeof loadSuccess>;

type DetailState = {
  isLoading: boolean;
  item: any;
};

//initial state
const initialState: DetailState = {
  isLoading: true,
  item: {},
};
