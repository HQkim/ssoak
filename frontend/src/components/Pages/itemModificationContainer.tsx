import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import React, { useState, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ItemCreation from "../Templates/itemCreation";
import NavigatorTitle from "../Atoms/Typographies/navigatorTitle";
import { useNavigation } from "@react-navigation/native";

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");

type Props = {
  navigation: any;
  route: object;
};

const ItemModificationContainer = (props: Props) => {
  return (
    <View>
      <Text>수정</Text>
    </View>
  );
};

export default ItemModificationContainer;

const styles = StyleSheet.create({});
