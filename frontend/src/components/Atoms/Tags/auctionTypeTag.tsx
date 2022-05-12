import { View, Text, Dimensions } from "react-native";
import React from "react";

type Props = {};
const { width: ScreenWidth } = Dimensions.get("window");

const AuctionTypeTag = ({ styles, text }) => {
  return (
    <View style={styles.tag}>
      <Text style={{ fontSize: ScreenWidth / 26, color: "#ffffff" }}>
        {text}
      </Text>
    </View>
  );
};

export default AuctionTypeTag;
