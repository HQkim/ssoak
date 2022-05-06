import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Purchased from "../Templates/purchased";

type Props = {
  navigation: any;
  route: object;
};

const PurchasedContainer = ({ navigation, route }: Props) => {
  useEffect(() => {
    navigation.addListener("focus", () => {
      console.warn("purchased");
    });
  }, [navigation]);
  return <Purchased />;
};

export default PurchasedContainer;

const styles = StyleSheet.create({});
