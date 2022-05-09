import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import React, { useState, useRef } from "react";
import ItemModification from "../Templates/itemModification";

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");

type Props = {
  navigation: any;
  route: object;
  params: any;
};

const ItemModificationContainer = (props: Props) => {
  const item = props.route.params.params;
  return (
    <View>
      <ItemModification
        route={props.route}
        item={item}
        navigation={props.navigation}
      />
    </View>
  );
};

export default ItemModificationContainer;

const styles = StyleSheet.create({});
