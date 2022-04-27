import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
type Props = {
  onPress: () => any;
  size: number;
};

const BellIcon = (props: Props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <AntDesign name="bells" size={props.size} color="black" />
    </TouchableOpacity>
  );
};

export default BellIcon;

const styles = StyleSheet.create({});
