import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OnSale from "../Templates/onSale";

type Props = {
  navigation: any;
  route: object;
};

const OnSaleContainer = ({ navigation, route }: Props) => {
  useEffect(() => {
    navigation.addListener("focus", () => {
      console.warn("onSale");
    });
  }, [navigation]);
  return <OnSale />;
};

export default OnSaleContainer;

const styles = StyleSheet.create({});
