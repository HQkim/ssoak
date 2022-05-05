import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";

type Props = {};
const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");

const FilterEndDateTimeAndroid = ({ functions, states, date }) => {
  const { setEndDateOpen } = functions;
  const { dateOpen } = states;
  return (
    <TouchableOpacity
      onPress={() => setEndDateOpen(!dateOpen)}
      style={{
        alignItems: "center",
        borderRadius: 55,
        borderColor: "#4A4C4E",
        borderWidth: 0.7,
        width: ScreenWidth / 3,
        height: ScreenWidth / 13,
        justifyContent: "center",
      }}
    >
      {date && (
        <Text>{`${date.getFullYear()}. ${
          date.getMonth() + 1
        }. ${date.getDate()}.`}</Text>
      )}
    </TouchableOpacity>
  );
};

export default FilterEndDateTimeAndroid;
