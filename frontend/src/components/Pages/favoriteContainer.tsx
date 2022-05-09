import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Favorite from "../Templates/favorite";

type Props = {
  navigation: any;
  route: object;
};

const Stack = createStackNavigator();

const FavoriteContainer = ({ navigation, route }: Props) => {
  const onCancel = () => {
    navigation.navigate("main");
  };

  return <Favorite navigation={navigation} route={route} />;
};

export default FavoriteContainer;

const styles = StyleSheet.create({
  navigatorTitle: {
    fontSize: 20,
    fontWeight: "200",
  },
  navigatorCancle: {
    fontSize: 20,
    fontWeight: "200",
  },
});
