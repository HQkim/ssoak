import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { kakaoDelete } from "../../apis/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  navigation: any;
  route: object;
};

const SettingContainer = (props: Props) => {
  const deleteAccount = async () => {
    await kakaoDelete();
    await AsyncStorage.removeItem("accessToken");
    props.navigation.navigate("main");
  };

  return (
    <View style={{ marginTop: 500 }}>
      <TouchableOpacity onPress={deleteAccount}>
        <Text>회원탈퇴</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingContainer;

const styles = StyleSheet.create({});
