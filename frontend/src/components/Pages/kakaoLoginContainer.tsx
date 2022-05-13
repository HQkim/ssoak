import React, { useState } from "react";
import { View, Button, Text, BackHandler } from "react-native";
import { WebView } from "react-native-webview";
import { kakaoLogin } from "../../apis/auth";
import { useDispatch } from "react-redux";
import { loginRequestAction } from "../../store/modules/login";

const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;

const KakaoLoginContainer = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const LogInProgress = async (data: any) => {
    const exp = "code=";
    var condition = data.indexOf(exp);
    if (condition != -1) {
      var request_code = data.substring(condition + exp.length);

      dispatch(loginRequestAction(request_code));
      navigation.goBack();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={["*"]}
        scalesPageToFit={true}
        source={{
          uri: "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=06d2438acf1f84102b574a2ce97bcd10&redirect_uri=https://auth.expo.io/@ssafy207/frontend",
        }}
        injectedJavaScript={runFirst}
        javaScriptEnabled={true}
        // userAgent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
        onMessage={(event) => {
          LogInProgress(event.nativeEvent["url"]);
        }}
      />
    </View>
  );
};

export default KakaoLoginContainer;
