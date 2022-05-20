import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";

type Props = {};
const { width: ScreenWidth } = Dimensions.get("window");

const CompletedTag = ({ styles, text }) => {
  return (
    <View style={styles.tag}>
      <Text
        style={{
          fontSize: ScreenWidth / 26,
          color: "#ffffff",
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default CompletedTag;

const styles = StyleSheet.create({});
