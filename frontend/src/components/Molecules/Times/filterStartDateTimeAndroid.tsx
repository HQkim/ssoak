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
    <View>
      <View>
        <TouchableOpacity
          onPress={() => setStartDateOpen(!startDateOpen)}
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
          <Text>{`${date.getFullYear()}. ${
            date.getMonth() + 1
          }. ${date.getDate()}.`}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => setStartMinuteOpen(!startMinuteOpen)}
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
          <Text>{`${date.getHours() < 10 ? "0" : ""}${date.getHours()}: ${
            date.getMinutes() < 10 ? "0" : ""
          }${date.getMinutes()}`}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilterStartDateTimeAndroid;
