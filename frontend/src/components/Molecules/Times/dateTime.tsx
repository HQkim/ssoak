import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Pressable, View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import * as Device from "expo-device";
import DateTimeAndroid from "./dateTimeAndroid";
const DateTime = () => {
  const [dateOpen, setDateOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    Device.osName === "Android" && setDateOpen(false);
    Device.osName === "Android" && setTimeOpen(false);
    selectedDate !== undefined && setDate(currentDate);
    // console.warn(currentDate);
  };

  useEffect(() => {
    if (Device.osName === "iOS") {
      setDateOpen(true);
      setTimeOpen(true);
    }
  }, []);

  return (
    <View style={{ flexDirection: "row" }}>
      {Device.osName === "Android" && (
        <DateTimeAndroid
          functions={{ setTimeOpen, setDateOpen }}
          states={{ timeOpen, dateOpen }}
          date={date}
        />
      )}
      {dateOpen && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          // display="spinner"
          is24Hour={true}
          minimumDate={date}
          locale="ko-KR"
          onChange={onChange}
          style={{ flex: 2 }}
        />
      )}
      {timeOpen && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"time"}
          is24Hour={true}
          locale="ko-KR"
          onChange={onChange}
          style={{ flex: 1 }}
        />
      )}
    </View>
  );
};

export default DateTime;
