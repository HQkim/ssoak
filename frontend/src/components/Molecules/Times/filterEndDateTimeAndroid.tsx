import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";

type Props = {};
const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");

const FilterEndDateTimeAndroid = ({ functions, states, date }) => {
  const { setEndDateOpen, setEndMinuteOpen } = functions;
  const { endDateOpen, endMinuteOpen } = states;
  return (
    <View
      style={{
        flexDirection: "row",
        flex: 1,
      }}
    >
      <View>
        <TouchableOpacity
          onPress={() => setEndDateOpen(!endDateOpen)}
          style={{
            width: ScreenWidth / 3,
            alignItems: "center",
            backgroundColor: "#A1A5AC",
            borderRadius: 5,
          }}
        >
          {date && (
            <Text>{`${date.getFullYear()}. ${
              date.getMonth() + 1
            }. ${date.getDate()}.`}</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={{ marginLeft: 10 }}>
        <TouchableOpacity
          onPress={() => setEndMinuteOpen(!endMinuteOpen)}
          style={{
            width: ScreenWidth / 4,
            alignItems: "center",
            backgroundColor: "#A1A5AC",
            borderRadius: 5,
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
