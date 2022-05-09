import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

type Props = {};

const UserSetting = (props: Props) => {
  return (
    <View>
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>사용자 설정</Text>
      <View>
        <Text>테마 모드</Text>
      </View>
      <View
        style={{
          borderBottomColor: "#d7d4d4",
          borderBottomWidth: 1,
          marginTop: 15,
        }}
      ></View>
    </View>
  );
};

export default UserSetting;

const styles = StyleSheet.create({});
