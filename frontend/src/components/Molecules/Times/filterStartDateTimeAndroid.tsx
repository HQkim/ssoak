import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import React from "react";

type Props = {};
const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");

const FilterStartDateTimeAndroid = ({ functions, states, date }) => {
  const { setStartDateOpen, setStartMinuteOpen } = functions;
  const { startDateOpen, startMinuteOpen } = states;
  return (
    <View
      style={{
        flexDirection: "row",
        flex: 1,
      }}
    >
      <View>
        <TouchableOpacity
          onPress={() => setStartDateOpen(!startDateOpen)}
          style={{
            width: ScreenWidth / 3,
            alignItems: "center",
            backgroundColor: "#A1A5AC",
            borderRadius: 5,
          }}
        >
          <Text>{`${date.getFullYear()}. ${
            date.getMonth() + 1
          }. ${date.getDate()}.`}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginLeft: 10 }}>
        <TouchableOpacity
          onPress={() => setStartMinuteOpen(!startMinuteOpen)}
          style={{
            width: ScreenWidth / 4,
            alignItems: "center",
            backgroundColor: "#A1A5AC",
            borderRadius: 5,
          }}
        >
          <Text>{`${date.getHours() < 10 ? "0" : ""}${date.getHours()}: ${
            date.getMinutes() < 10 ? "0" : ""
          }${date.getMinutes()}`}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilterStartDateTimeAndroid;
