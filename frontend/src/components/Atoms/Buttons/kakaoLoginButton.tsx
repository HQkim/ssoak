import { StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
type Props = {};

const KakaoButton = require("../../../../assets/kakao_login.png");

const KakaoLoginButton = ({ loadKakaoLogin }) => {
  return (
    <TouchableOpacity onPress={loadKakaoLogin}>
      <Image source={KakaoButton} />
    </TouchableOpacity>
  );
};

export default KakaoLoginButton;

const styles = StyleSheet.create({});
