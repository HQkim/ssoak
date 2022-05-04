import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

type Props = {
  style: object;
};

const NavigatorTextInput = (props: Props) => {
  return <TextInput style={props.style} />;
};

export default NavigatorTextInput;

const styles = StyleSheet.create({});
