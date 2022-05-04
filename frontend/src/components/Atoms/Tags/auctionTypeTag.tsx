import { View, Text } from "react-native";
import React from "react";

type Props = {};

const AuctionTypeTag = ({ styles, text }) => {
  return (
    <View>
      <Text style={styles.tag}>{text}</Text>
    </View>
  );
};

export default AuctionTypeTag;
