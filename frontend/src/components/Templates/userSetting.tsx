import { StyleSheet, Text, View, Switch } from "react-native";
import React, { useState } from "react";

type Props = {};

const UserSetting = (props: Props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>사용자 설정</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text>테마 모드</Text>

        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
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
