import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import * as AppleAuthentication from "expo-apple-authentication";
import { appleLogin } from "../../../apis/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {};

const AppleLoginButton = (props: Props) => {
  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      cornerRadius={5}
      style={{
        width: Dimensions.get("window").width * 0.73,
        height: 44,
        marginTop: 10,
      }}
      onPress={async () => {
        try {
          const credential: any = await AppleAuthentication.signInAsync({
            requestedScopes: [
              AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
              AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
          });

          // signed in
          try {
            const response = await appleLogin(credential.identityToken);
            AsyncStorage.setItem("accessToken", response.data);
          } catch (e) {
            console.log(e);
          }
        } catch (e: any) {
          if (e.code === "ERR_CANCELED") {
            console.log(e);
          } else {
          }
        }
      }}
    />
  );
};

export default AppleLoginButton;
