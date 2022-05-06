// ducks 패턴
import { delay, put, call, takeEvery, takeLatest } from "redux-saga/effects";
import { detailAuction } from "../../apis/auctionApi";
import axios from "axios";
const BASE_URL = "http://k6a207.p.ssafy.io:5000/api/v1";
// actions
const LOAD_DATA = "detail/LOAD_DATA" as const;
const LOAD_DATA_ASYNC = "detail/LOAD_DATA_ASYNC" as const;
const LOAD_SUCCESS = "detail/LOAD_SUCCESS" as const;
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

//middleware
function* loadDataSaga(action: any) {
  yield put(loadData(true));
  try {
    const result = yield call(detailAuction, action.payload);
    yield delay(3000);
    yield put(loadSuccess(result));
  } catch (error) {
    // yield put(loadError(error.response))
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
  action: DetailAction,
): DetailState {
  switch (action.type) {
    case LOAD_DATA:
      return { ...state, isLoading: action.payload };
    case LOAD_SUCCESS:
      return { ...state, item: action.payload };
    default:
      return state;
  }
}

export default detail;

//Types for typescript
type DetailAction =
  | ReturnType<typeof loadData>
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
