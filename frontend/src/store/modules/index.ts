import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import mainLoader, { loaderSaga } from "./mainLoader";
import detail, { detailSaga } from "./detail";
import login, { loginSaga } from "./login";

const rootReducer = combineReducers({
  mainLoader,
  detail,
  login,
});

export function* rootSaga() {
  yield all([loaderSaga(), detailSaga(), loginSaga()]);
}

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
