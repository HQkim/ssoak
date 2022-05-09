import { StyleSheet, Text, View, Dimensions, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Device from "expo-device";
import FilterStartDateTimeAndroid from "../../Molecules/Times/filterStartDateTimeAndroid";
import FilterEndDateTimeAndroid from "../../Molecules/Times/filterEndDateTimeAndroid";

type Props = {
  getSelectInformation: Function;
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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [minimumDate, setMinimumDate] = useState(new Date());
  const [timeRange, setTimeRange] = useState<timeType | any | null>();

  const onChangeStart = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    Device.osName === "Android" && setStartDateOpen(false);
    selectedDate !== undefined && setStartDate(currentDate);
    const now = new Date(selectedDate);
    now.setHours(now.getHours() + 9);
    let timeInformation = JSON.stringify(now);
    let tmp = timeInformation.replace(".000Z", "");
    let time = JSON.parse(tmp);
    now.setMinutes(now.getMinutes() + 30);
    let timeInfo = JSON.stringify(now);
    let temp = timeInfo.replace(".000Z", "");
    let dateTime = JSON.parse(temp);
    setTimeRange({
      startDate: currentDate,
      endDate: endDate,
    });
    props.getSelectInformation(timeRange);
  };

  const onChangeEnd = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    Device.osName === "Android" && setEndDateOpen(false);
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
    setTimeRange({
      startDate: startDate,
      endDate: currentDate,
    });
    props.getSelectInformation(timeRange);
  };

  console.log(timeRange);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      setMinimumDate(new Date());
    });
    return unsubscribe;
  }, [props.navigation]);

  return (
    <View>
      <View style={{ height: ScreenHeight / 20 }}>
        <Text style={{ fontSize: ScreenHeight / 45 }}>시작시간</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {Device.osName === "Android" && (
          <FilterStartDateTimeAndroid
            functions={{ setStartDateOpen }}
            states={{ startDateOpen }}
            date={startDate}
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
        <View>
          <Text>~</Text>
        </View>
        {Device.osName === "Android" && (
          <FilterEndDateTimeAndroid
            functions={{ setEndDateOpen }}
            states={{ endDateOpen }}
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
