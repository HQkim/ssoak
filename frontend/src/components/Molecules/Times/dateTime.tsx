import DateTimePicker from "@react-native-community/datetimepicker";
import { View } from "react-native";
import React, { useState, useEffect } from "react";
import * as Device from "expo-device";
import DateTimeAndroid from "./dateTimeAndroid";

type Props = {
  navigation: any;
  route: object;
  getSelectInformation: Function;
  item: any;
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
    const timeInformation = JSON.stringify(now);
    const result = timeInformation.substring(20, 25);
    const tmp = timeInformation.replace(result, "");
    const time = JSON.parse(tmp);
    now.setMinutes(now.getMinutes() + 30);
    const timeInfo = JSON.stringify(now);
    const result2 = timeInfo.substring(20, 25);
    const temp = timeInfo.replace(result2, "");
    const dateTime = JSON.parse(temp);
    props.getSelectInformation(time, dateTime);
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      if (props.item === 0) {
        setDate(new Date());
      } else if (props.item != 0) {
        const startDateTime = props.item.startTime;
        const endDateTime = props.item.endTime;
        if (props.item.auctionType === "NORMAL") {
          setDate(new Date(endDateTime));
        } else if (props.item.auctionType === "LIVE") {
          setDate(new Date(startDateTime));
        }
      }
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
