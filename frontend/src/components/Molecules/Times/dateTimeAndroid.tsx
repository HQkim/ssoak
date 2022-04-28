import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

type Props = {};

const dateTimeAndroid = ({ functions, states, date }) => {
  const { setDateOpen, setTimeOpen } = functions;
  const { dateOpen, timeOpen } = states;
  return (
    <View
      style={{
        flexDirection: "row",
        flex: 1,
      }}
    >
      <View style={{ flex: 1 }} />
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => setDateOpen(!dateOpen)}
          style={{
            flex: 1,
            alignItems: "center",
            backgroundColor: "grey",
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
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          onPress={() => setTimeOpen(!timeOpen)}
          style={{
            flex: 6,
            alignItems: "center",
            backgroundColor: "grey",
            borderRadius: 5,
          }}
        >
          {date && (
            <Text>{`${date.getHours() < 10 ? "0" : ""}${date.getHours()}: ${
              date.getMinutes() < 10 ? "0" : ""
            }${date.getMinutes()}`}</Text>
          )}
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
      </View>
    </View>
  );
};

export default dateTimeAndroid;
