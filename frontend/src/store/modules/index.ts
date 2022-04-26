import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import counter, { counterSaga } from "./counter";
import mainLoader, { loaderSaga } from "./mainLoader";
import detail, { detailSaga } from "./detail";

const rootReducer = combineReducers({
  counter,
  mainLoader,
  detail,
});

export function* rootSaga() {
  yield all([counterSaga(), loaderSaga(), detailSaga()]);
}

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
