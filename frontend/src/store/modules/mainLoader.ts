// ducks 패턴
import {
  delay,
  put,
  take,
  takeEvery,
  takeLatest,
  call,
  all,
} from "redux-saga/effects";
import { getList } from "../../apis/auctionApi";

// actions
const DATA_FETCH = "main/DATA_FETCH_LOADING" as const;
const DATA_FETCH_COMPLETE = "main/DATA_FETCH_COMPLETE" as const;
const DATA_FETCH_ASYNC = "main/DATA_FETCH_ASYNC" as const;
const DATA_RESET = "main/DATA_RESET" as const;
const DATA_FETCH_ASYNC_WITHOUT_LOADER =
  "main/DATA_FETCH_ASYNC_WITHOUT_LOADER" as const;
const DATA_FETCH_FIRST_ASYNC = "main/DATA_FETCH_FIRST_ASYNC" as const;
//Action 생성자

export const dataFetch = (status: boolean) => ({
  type: DATA_FETCH,
  payload: status,
});

export const dataFetchComplete = (data: any, keyword: string) => ({
  type: DATA_FETCH_COMPLETE,
  payload: data,
  keyword,
});

export const dataFetchFirstAsync = () => ({
  type: DATA_FETCH_FIRST_ASYNC,
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
    yield put(dataFetchComplete(data.data.auctionList, action.payload.keyword));
  } catch (e) {
    // console.log(e);
  } finally {
    yield put(dataFetch(false));
  }
}

function* mainSagaWithoutLoader(action: any) {
  try {
    const data = yield call(getList, {
      keyword: action.payload.keyword,
      page: action.payload.page,
    });
    yield put(dataFetchComplete(data.data.auctionList, action.payload.keyword));
  } catch (e) {
    console.log(e);
  }
}

function* mainFirstFetchSagaLoader(action: any) {
  try {
    yield put(dataFetch(true));
    const params = ["LIVE", "NORMAL"];

    const responses = yield all(
      params.map((param) =>
        call(getList, {
          keyword: param,
          page: 1,
        }),
      ),
    );
    yield delay(1000);

    yield put(
      dataFetchComplete(
        responses[0].data.auctionList.concat(responses[1].data.auctionList),
        "FIRST",
      ),
    );
  } catch (e) {
    console.log(e);
  } finally {
    yield put(dataFetch(false));
  }
}

export function* loaderSaga() {
  yield takeEvery(DATA_FETCH_ASYNC, mainSagaLoader);
  yield takeEvery(DATA_FETCH_ASYNC_WITHOUT_LOADER, mainSagaWithoutLoader);
  yield takeLatest(DATA_FETCH_FIRST_ASYNC, mainFirstFetchSagaLoader);
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
      if (action.keyword === "FIRST") {
        return {
          livePageAvailable: true,
          normalPageAvailable: true,
          isLoading: false,
          data: state.data.concat(action.payload),
        };
      }
      if (action.payload.length < 10) {
        if (action.keyword === "LIVE") {
          return {
            ...state,
            livePageAvailable: false,
            isLoading: false,
            data: state.data.concat(action.payload),
          };
        }
        if (action.keyword === "NORMAL") {
          return {
            ...state,
            normalPageAvailable: false,
            isLoading: false,
            data: state.data.concat(action.payload),
          };
        }
      } else {
        if (action.keyword === "LIVE") {
          return {
            ...state,
            livePageAvailable: true,
            isLoading: false,
            data: state.data.concat(action.payload),
          };
        }
        if (action.keyword === "NORMAL") {
          return {
            ...state,
            normalPageAvailable: true,
            isLoading: false,
            data: state.data.concat(action.payload),
          };
        }
      }
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
  livePageAvailable: boolean;
  normalPageAvailable: boolean;
};

//initial state
const initialState: LoaderState = {
  isLoading: true,
  data: [],
  livePageAvailable: true,
  normalPageAvailable: true,
};
