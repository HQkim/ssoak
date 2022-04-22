import { StyleSheet, Text, View } from "react-native";
import React from "react";
// import { ViewPropTypes } from "react-native";

type Props = {
  [style: string]: any;
};

const cardBox = (props: Props) => {
  return <View style={props.style}></View>;
};

export default cardBox;

const styles = StyleSheet.create({});
