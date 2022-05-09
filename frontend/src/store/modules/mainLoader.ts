// ducks 패턴
import {
  delay,
  put,
  take,
  takeEvery,
  takeLatest,
  call,
} from "redux-saga/effects";
import { getList } from "../../apis/auctionApi";

// actions
const DATA_FETCH = "main/DATA_FETCH_LOADING" as const;
const DATA_FETCH_COMPLETE = "main/DATA_FETCH_COMPLETE" as const;
const DATA_FETCH_ASYNC = "main/DATA_FETCH_ASYNC" as const;
const DATA_RESET = "main/DATA_RESET" as const;
const DATA_FETCH_ASYNC_WITHOUT_LOADER =
  "main/DATA_FETCH_ASYNC_WITHOUT_LOADER" as const;
//Action 생성자

export const dataFetch = (status: boolean) => ({
  type: DATA_FETCH,
  payload: status,
});

export const dataFetchComplete = (data: any) => ({
  type: DATA_FETCH_COMPLETE,
  payload: data,
});

export const dataReset = () => ({
  type: DATA_RESET,
});

export const dataFetchAsync = (payload: any) => ({
  type: DATA_FETCH_ASYNC,
  payload: {
    keyword: payload.keyword,
    page: payload.page,
  },
});

export const dataFetchAsyncWithoutLoader = (payload: any) => ({
  type: DATA_FETCH_ASYNC_WITHOUT_LOADER,
  payload: {
    keyword: payload.keyword,
    page: payload.page,
  },
});

//middleware
function* mainSagaLoader(action: any) {
  console.log(action);
  yield put(dataFetch(true));
  try {
    const data = yield call(getList, {
      keyword: action.payload.keyword,
      page: action.payload.page,
    });
    yield delay(1000);
    yield put(dataFetchComplete(data.data.auctionList));
  } catch {
  } finally {
    yield put(dataFetch(false));
  }
}

function* mainSagaWithoutLoader(action: any) {
  const data = yield call(getList, {
    keyword: action.payload.keyword,
    page: action.payload.page,
  });
  yield put(dataFetchComplete(data.data.auctionList));
}

export function* loaderSaga() {
  yield takeEvery(DATA_FETCH_ASYNC, mainSagaLoader);
  yield takeEvery(DATA_FETCH_ASYNC_WITHOUT_LOADER, mainSagaWithoutLoader);
}

//reducer
function counter(
  state: LoaderState = initialState,
  action: LoaderAction,
): LoaderState {
  switch (action.type) {
    case DATA_FETCH:
      return { ...state, isLoading: action.payload };
    case DATA_FETCH_COMPLETE:
      return { isLoading: false, data: [...state.data, ...action.payload] };
    case DATA_RESET:
      return { ...state, data: [] };
    default:
      return state;
  }
}

export default counter;

//Types for typescript
type LoaderAction =
  | ReturnType<typeof dataFetch>
  | ReturnType<typeof dataFetchAsync>
  | ReturnType<typeof dataFetchComplete>
  | ReturnType<typeof dataReset>
  | ReturnType<typeof dataFetchAsyncWithoutLoader>;

type LoaderState = {
  isLoading: boolean;
  data: any;
};

//initial state
const initialState: LoaderState = {
  isLoading: true,
  data: [],
};
