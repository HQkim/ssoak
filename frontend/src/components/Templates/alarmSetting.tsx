import { StyleSheet, Text, View, Switch } from "react-native";
import React, { useState } from "react";

type Props = {};

const AlarmSetting = (props: Props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View>
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>알림 설정</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

export default AlarmSetting;

const styles = StyleSheet.create({});
