import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import UserSetting from "../Templates/userSetting";
import AlarmSetting from "../Templates/alarmSetting";
import OtherSetting from "../Templates/otherSetting";

type Props = {
  navigation: any;
  route: object;
};

const SettingContainer = (props: Props) => {
  return (
    <View style={styles.SettingContainer}>
      <View style={{ flex: 1 }}>
        <UserSetting />
      </View>
      <View style={{ flex: 2 }}>
        <AlarmSetting />
      </View>
      <View style={{ flex: 1 }}>
        <OtherSetting navigation={props.navigation} route={props.route} />
      </View>
    </View>
  );
};

export default SettingContainer;

const styles = StyleSheet.create({
  SettingContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    flex: 1,
  },
});
