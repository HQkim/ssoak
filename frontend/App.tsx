import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./src/store/modules";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./src/store/modules";
import LoadingContainer from "./src/components/Pages/loadingContainer";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

export default function App() {
  useEffect(() => {
    if (typeof TextEncoder !== "function") {
      const TextEncodingPolyfill = require("text-encoding");
      TextEncoder = TextEncodingPolyfill.TextEncoder;
      TextDecoder = TextEncodingPolyfill.TextDecoder;
    }
  }, []);
  return (
    <Provider store={store}>
      <LoadingContainer />
      <StatusBar style="auto" />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
