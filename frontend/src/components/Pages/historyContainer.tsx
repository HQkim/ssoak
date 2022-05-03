import { StyleSheet } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SoldContainer from "./soldContainer";
import NotSoldContainer from "./notSoldContainer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

type Props = {};
const Tab = createMaterialTopTabNavigator();

const HistoryContainer = (props: Props) => {
  const Stack = createStackNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="sold" component={SoldContainer} />
      <Tab.Screen name="notsold" component={NotSoldContainer} />
    </Tab.Navigator>
  );
};

export default HistoryContainer;

const styles = StyleSheet.create({});
