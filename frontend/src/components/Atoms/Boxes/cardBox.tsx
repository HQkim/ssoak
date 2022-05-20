import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  style: any;
  onPress: () => void;
  route: any;
};

const cardBox = (props: Props) => {
  return (
    <TouchableOpacity style={props.style} onPress={props.onPress}>
      {props.children}
    </TouchableOpacity>
  );
};

export default cardBox;

const styles = StyleSheet.create({});
