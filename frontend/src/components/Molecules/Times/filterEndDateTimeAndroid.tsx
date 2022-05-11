import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";

type Props = {};
const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");

const FilterEndDateTimeAndroid = ({ functions, states, date }) => {
  const { setEndDateOpen, setEndMinuteOpen } = functions;
  const { endDateOpen, endMinuteOpen } = states;
  return (
    <View>
      <View>
        <TouchableOpacity
          onPress={() => setEndDateOpen(!endDateOpen)}
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
      </View>
      <View>
        <TouchableOpacity
          onPress={() => setEndMinuteOpen(!endMinuteOpen)}
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
            <Text>{`${date.getHours() < 10 ? "0" : ""}${date.getHours()}: ${
              date.getMinutes() < 10 ? "0" : ""
            }${date.getMinutes()}`}</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilterEndDateTimeAndroid;
