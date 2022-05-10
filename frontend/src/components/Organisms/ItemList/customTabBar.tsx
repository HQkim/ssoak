import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { TabBar } from "react-native-tab-view";

type Props = {};

const CustomTabBar = (props: any) => {
  const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");
  return (
    <TabBar
      {...props.props}
      style={{ backgroundColor: "transparent" }}
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
      }}
      indicatorStyle={{
        backgroundColor: "#719dd7",
        width: ScreenWidth / 4,
        alignSelf: "center",
      }}
      indicatorContainerStyle={{
        marginHorizontal: ScreenWidth / 8,
      }}
      labelStyle={{ color: "black" }}
    />
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({});
