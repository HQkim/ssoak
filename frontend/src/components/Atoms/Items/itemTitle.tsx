import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {};

const ItemTitle = ({ titleStyle, numberOfLines, value }) => {
  return (
    <Text style={titleStyle} numberOfLines={numberOfLines}>
      {value}
    </Text>
  );
};

export default ItemTitle;

const styles = StyleSheet.create({});
