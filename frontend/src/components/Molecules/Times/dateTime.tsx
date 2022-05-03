import DateTimePicker from "@react-native-community/datetimepicker";
import { View } from "react-native";
import React, { useState, useEffect } from "react";
import * as Device from "expo-device";
import DateTimeAndroid from "./dateTimeAndroid";

type Props = {
  navigation: any;
  route: object;
  getSelectInformation: Function;
};

const DateTime = (props: Props) => {
  const [dateOpen, setDateOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [minimumDate, setMinimumDate] = useState(new Date());

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    Device.osName === "Android" && setDateOpen(false);
    Device.osName === "Android" && setTimeOpen(false);
    selectedDate !== undefined && setDate(currentDate);
    props.getSelectInformation(selectedDate);
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      setMinimumDate(new Date());
    });
    return unsubscribe;
  }, [props.navigation]);

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
          minimumDate={minimumDate}
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
          minimumDate={minimumDate}
          locale="ko-KR"
          onChange={onChange}
          style={{ flex: 1 }}
        />
      )}
    </View>
  );
};

export default DateTime;
