import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OnSale from "../Templates/onSale";

type Props = {
  navigation: any;
  route: object;
};

type Items = {
  items: Array<object>;
};

const OnSaleContainer = ({ navigation, route }: Props) => {
  const [items, setItems] = useState<Items | null | any>([]);

  return <OnSale navigation={navigation} route={route} />;
};

export default OnSaleContainer;

const styles = StyleSheet.create({});
