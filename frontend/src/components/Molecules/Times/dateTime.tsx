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
    const now = new Date(selectedDate);
    now.setHours(now.getHours() + 9);
    let timeInformation = JSON.stringify(now);
    let tmp = timeInformation.replace(".000Z", "");
    let time = JSON.parse(tmp);
    now.setMinutes(now.getMinutes() + 30);
    let timeInfo = JSON.stringify(now);
    let temp = timeInfo.replace(".000Z", "");
    let dateTime = JSON.parse(temp);
    props.getSelectInformation(time, dateTime);
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      setMinimumDate(new Date());
      setDate(new Date());
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
