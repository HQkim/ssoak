import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {};

const CompletedTag = ({ styles, text }) => {
  return (
    <View>
      <Text style={styles.tag}>{text}</Text>
    </View>
  );
};

export default CompletedTag;

const styles = StyleSheet.create({});
