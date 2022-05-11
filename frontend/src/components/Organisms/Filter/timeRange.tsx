import { StyleSheet, Text, View, Dimensions, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Device from "expo-device";
import FilterStartDateTimeAndroid from "../../Molecules/Times/filterStartDateTimeAndroid";
import FilterEndDateTimeAndroid from "../../Molecules/Times/filterEndDateTimeAndroid";

type Props = {
  getSelectstInformation: Function;
  getSelectetInformation: Function;
  navigation: any;
  route: object;
};

type timeType = {
  startTime: object;
  endTime: object;
};

const { height: ScreenHeight } = Dimensions.get("window");
const { width: ScreenWidth } = Dimensions.get("window");

const TimeRange = (props: Props) => {
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);
  const [startMinuteOpen, setStartMinuteOpen] = useState(false);
  const [endMinuteOpen, setEndMinuteOpen] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startMinute, setStartMinute] = useState(new Date());
  const [endMinute, setEndMinute] = useState(new Date());

  const [minimumDate, setMinimumDate] = useState(new Date());

  const onChangeStart = async (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    Device.osName === "Android" && setStartDateOpen(false);
    Device.osName === "Android" && setStartMinuteOpen(false);
    selectedDate !== undefined && setStartDate(currentDate);
    const now = new Date(selectedDate);
    now.setHours(now.getHours() + 9);
    let timeInformation = JSON.stringify(now);
    const result = timeInformation.substring(20, 25);
    const tmp = timeInformation.replace(result, "");
    const time = JSON.parse(tmp);
    now.setMinutes(now.getMinutes() + 30);
    const timeInfo = JSON.stringify(now);
    const result2 = timeInfo.substring(20, 25);
    const temp = timeInfo.replace(result2, "");
    const dateTime = JSON.parse(temp);
    await props.getSelectstInformation(dateTime, time);
  };

  const onChangeEnd = async (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    Device.osName === "Android" && setEndDateOpen(false);
    Device.osName === "Android" && setEndMinuteOpen(false);
    selectedDate !== undefined && setEndDate(currentDate);
    const now = new Date(selectedDate);
    now.setHours(now.getHours() + 9);
    let timeInformation = JSON.stringify(now);
    let tmp = timeInformation.replace(".000Z", "");
    let time = JSON.parse(tmp);
    now.setMinutes(now.getMinutes() + 30);
    let timeInfo = JSON.stringify(now);
    let temp = timeInfo.replace(".000Z", "");
    let dateTime = JSON.parse(temp);
    await props.getSelectetInformation(dateTime, time);
  };

  // useEffect(() => {
  //   const unsubscribe = props.navigation.addListener("focus", () => {
  //     // setMinimumDate(new Date());
  //   });
  //   return unsubscribe;
  // }, [props.navigation]);

  return (
    <View>
      <View style={{ height: ScreenHeight / 20 }}>
        <Text style={{ fontSize: ScreenHeight / 45 }}>시작시간</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {Device.osName === "Android" && (
          <FilterStartDateTimeAndroid
            functions={{ setStartDateOpen, setStartMinuteOpen }}
            states={{ startDateOpen, startMinuteOpen }}
            date={startDate}
            // time={startMinute}
          />
        )}
        {startDateOpen && (
          <DateTimePicker
            testID="dateTimePickerStart"
            value={startDate}
            mode={"date"}
            is24Hour={true}
            minimumDate={minimumDate}
            locale="ko-KR"
            onChange={onChangeStart}
            style={{ flex: 2 }}
          />
        )}
        {startMinuteOpen && (
          <DateTimePicker
            testID="dateTimePickerStart"
            value={startDate}
            mode={"time"}
            is24Hour={true}
            minimumDate={minimumDate}
            locale="ko-KR"
            onChange={onChangeStart}
            style={{ flex: 1 }}
          />
        )}
        <View>
          <Text>~</Text>
        </View>
        {Device.osName === "Android" && (
          <FilterEndDateTimeAndroid
            functions={{ setEndDateOpen, setEndMinuteOpen }}
            states={{ endDateOpen, endMinuteOpen }}
            date={endDate}
          />
        )}
        {endDateOpen && (
          <DateTimePicker
            testID="dateTimePickerEnd"
            value={endDate}
            mode={"date"}
            is24Hour={true}
            minimumDate={minimumDate}
            locale="ko-KR"
            onChange={onChangeEnd}
            style={{ flex: 2 }}
          />
        )}
        {endMinuteOpen && (
          <DateTimePicker
            testID="dateTimePickerEnd"
            value={endDate}
            mode={"time"}
            is24Hour={true}
            minimumDate={minimumDate}
            locale="ko-KR"
            onChange={onChangeEnd}
            style={{ flex: 1 }}
          />
        )}
      </View>
    </View>
  );
};

export default TimeRange;

const styles = StyleSheet.create({
  textArea: {
    borderRadius: 55,
    borderWidth: 0.7,
    width: ScreenWidth / 3,
    height: ScreenWidth / 13,
    marginBottom: 10,
    color: "#4A4C4E",
    paddingLeft: 15,
  },
});
