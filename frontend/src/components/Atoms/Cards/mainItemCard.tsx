import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  item: any[];
  style: any;
  children: any;
};

const MainItemCard = (props: Props) => {
  return <View style={props.style}>{props.children}</View>;
};

export default MainItemCard;

const styles = StyleSheet.create({});
