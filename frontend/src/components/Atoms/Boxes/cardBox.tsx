import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  style: any;
};

const cardBox = (props: Props) => {
  return (
    <TouchableOpacity style={props.style}>{props.children}</TouchableOpacity>
  );
};

export default cardBox;

const styles = StyleSheet.create({});
