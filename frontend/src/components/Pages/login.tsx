// import React from "react";
// import { View, Button, Text } from "react-native";
// import { WebView } from "react-native-webview";
// import axios from "axios";

// const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;

// const Login = ({ navigation }: any) => {
//   function LogInProgress(data: any) {
//     alert(data);
//     // access code는 url에 붙어 장황하게 날아온다.

//     // substringd으로 url에서 code=뒤를 substring하면 된다.

//     const exp = "code=";

//     var condition = data.indexOf(exp);

//     if (condition != -1) {
//       var request_code = data.substring(condition + exp.length);

//       console.log("access code :: " + request_code);

//       // 토큰값 받기

//       // requestToken(request_code);
//     }
//   }

//   // const requestToken = async (request_code: any) => {
//   //   var returnValue = "none";

//   //   var request_token_url = "http://localhost:19002";

//   //   axios({
//   //     method: "post",
//   //     url: request_token_url,
//   //     params: {
//   //       grant_type: "authorization_code",
//   //       client_id: "06d2438acf1f84102b574a2ce97bcd10",
//   //       redirect_uri: "http://localhost:19002",
//   //       code: request_code,
//   //     },
//   //   })
//   //     .then(function (response) {
//   //       returnValue = response.data.access_token;
//   //       console.warn(returnValue);
//   //     })
//   //     .catch(function (error) {
//   //       console.warn("error", error);
//   //     });
//   //   return returnValue;
//   // };

//   return (
//     <View style={{ flex: 1 }}>
//       <WebView
//         originWhitelist={["*"]}
//         scalesPageToFit={false}
//         style={{ marginTop: 30 }}
//         source={{
//           uri: "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=c319740f9f3e6a8802436210c99d75f4&redirect_uri=http://127.0.0.1:8000",
//         }}
//         injectedJavaScript={runFirst}
//         javaScriptEnabled={true}
//         onMessage={(event) => {
//           // alert(event.nativeEvent["url"]);
//           console.log(event.nativeEvent);
//           LogInProgress(event.nativeEvent["url"]);
//         }}
//       />
//     </View>
//   );
// };

// export default Login;
