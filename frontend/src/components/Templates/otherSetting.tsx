import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { kakaoDelete } from "../../apis/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  navigation: any;
  route: object;
};

const OtherSetting = (props: Props) => {
  const deleteAccount = async () => {
    await kakaoDelete();
    await AsyncStorage.removeItem("accessToken");
    props.navigation.navigate("main");
  };
  return (
    <View>
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>기타</Text>
      <TouchableOpacity onPress={() => console.log("문의하기")}>
        <Text>문의하기</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={deleteAccount}>
        <Text>회원탈퇴</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtherSetting;

const styles = StyleSheet.create({});
