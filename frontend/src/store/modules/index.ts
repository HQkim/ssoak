import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import counter, { counterSaga } from "./counter";
import mainLoader, { loaderSaga } from "./mainLoader";

const rootReducer = combineReducers({
  counter,
  mainLoader,
});

export function* rootSaga() {
  yield all([counterSaga(), loaderSaga()]);
}

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
