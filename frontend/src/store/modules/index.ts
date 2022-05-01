import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import counter, { counterSaga } from "./counter";
import mainLoader, { loaderSaga } from "./mainLoader";
import detail, { detailSaga } from "./detail";
import login, { loginSaga } from "./login";

const rootReducer = combineReducers({
  counter,
  mainLoader,
  detail,
  login,
});

export function* rootSaga() {
  yield all([counterSaga(), loaderSaga(), detailSaga(), loginSaga()]);
}

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
