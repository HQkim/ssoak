import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";

type Props = {};
const { width: ScreenWidth } = Dimensions.get("window");

const FilterTag = ({ styles, startTime, endTime }) => {
  const [text, setText] = useState("");
  const [currentTime, setCurrentTime] = useState<any | undefined | object>(
    new Date()
  );
  useEffect(() => {
    if (currentTime < new Date(startTime)) {
      setText("예약중");
    } else if (
      new Date(startTime) < currentTime &&
      currentTime < new Date(endTime)
    ) {
      setText("진행중");
    } else if (currentTime > new Date(endTime)) {
      setText("기간초과");
    }
  }, []);
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

export default FilterTag;

const styles = StyleSheet.create({});
