// ducks 패턴
import { delay, put, take, takeEvery, takeLatest } from "redux-saga/effects";

// actions
const INCREASE = "counter/INCREASE" as const;
const DECREASE = "counter/DECREASE" as const;
const INCREASE_BY = "counter/INCREASE_BY" as const;
const INCREASE_ASYNC = "counter/INCREASE_ASYNC" as const;
const DECREASE_ASYNC = "counter/DECREASE_ASYNC" as const;
const INCREASE_BY_ASYNC = "counter/INCREASE_BY_ASYNC" as const;

//Action 생성자
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const increaseBy = (diff: number) => ({
  type: INCREASE_BY,
  payload: diff,
});

export const increaseAsync = () => ({ type: INCREASE_ASYNC });
export const decreaseAsync = () => ({ type: DECREASE_ASYNC });
export const increaseByAsync = (diff: number) => ({
  type: INCREASE_BY_ASYNC,
  payload: diff,
});

//middleware
function* increaseSaga(action: any) {
  // console.log(action);
  yield delay(1000);
  yield put(increase());
}

function* decreaseSaga(action: any) {
  yield delay(1000);
  yield put(decrease());
}

function* increaseBySaga(action: any) {
  yield delay(1000);
  yield put(increaseBy(action.payload));
}

export function* counterSaga() {
  yield takeEvery(INCREASE_ASYNC, increaseSaga);
  yield takeEvery(DECREASE_ASYNC, decreaseSaga);
  yield takeLatest(INCREASE_BY_ASYNC, increaseBySaga);
}

//reducer
function counter(
  state: CounterState = initialState,
  action: CounterAction,
): CounterState {
  switch (action.type) {
    case INCREASE:
      return { value: state.value + 1 };
    case DECREASE:
      return { value: state.value - 1 };
    case INCREASE_BY:
      return { value: state.value + action.payload };
    default:
      return state;
  }
}

export default counter;

//Types for typescript
type CounterAction =
  | ReturnType<typeof increase>
  | ReturnType<typeof decrease>
  | ReturnType<typeof increaseBy>
  | ReturnType<typeof increaseAsync>
  | ReturnType<typeof decreaseAsync>
  | ReturnType<typeof increaseByAsync>;

type CounterState = {
  value: number;
};

//initial state
const initialState: CounterState = {
  value: 0,
};
