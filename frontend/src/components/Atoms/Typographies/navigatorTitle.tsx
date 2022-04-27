import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  [key: string]: string | object;
  title: string;
  style: object;
};

const NavigatorTitle = (props: Props) => {
  return (
    <View>
      <Text style={props.style}>{props.title}</Text>
    </View>
  );
};

export default NavigatorTitle;

const styles = StyleSheet.create({});
