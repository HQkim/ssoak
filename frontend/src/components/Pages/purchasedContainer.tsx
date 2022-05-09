import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Purchased from "../Templates/purchased";

type Props = {
  navigation: any;
  route: object;
};

const PurchasedContainer = ({ navigation, route }: Props) => {
  return <Purchased navigation={navigation} route={route} />;
};

export default PurchasedContainer;

const styles = StyleSheet.create({});
