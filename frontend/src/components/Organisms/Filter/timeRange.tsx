import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Device from "expo-device";
import FilterStartDateTimeAndroid from "../../Molecules/Times/filterStartDateTimeAndroid";
import FilterEndDateTimeAndroid from "../../Molecules/Times/filterEndDateTimeAndroid";
import RadioButton from "../../Atoms/Buttons/radioButton";
import Typography from "../../Atoms/Typographies/typography";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

type Props = {
  getSelectstInformation: Function;
  getSelectetInformation: Function;
  navigation: any;
  route: object;
  setStartString: Function;
  setEndString: Function;
  reset: Boolean;
};

type timeType = {
  startTime: object;
  endTime: object;
};

const { height: ScreenHeight } = Dimensions.get("window");
const { width: ScreenWidth } = Dimensions.get("window");

const TimeRange = (props: Props) => {
  const test = new Date();
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
    console.log(typeof currentDate, "1111111111");
    Device.osName === "Android" && setStartDateOpen(false);
    Device.osName === "Android" && setStartMinuteOpen(false);
    selectedDate !== undefined && setStartDate(currentDate);
    const now = new Date(selectedDate);
    now.setHours(now.getHours() + 9);
    await props.getSelectstInformation(now);
    let timeInformation = JSON.stringify(now);
    const result = timeInformation.substring(20, 25);
    const tmp = timeInformation.replace(result, "");
    console.log(tmp, "12312321");
    await props.setStartString(tmp);
  };

  const onChangeEnd = async (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    Device.osName === "Android" && setEndDateOpen(false);
    Device.osName === "Android" && setEndMinuteOpen(false);
    selectedDate !== undefined && setEndDate(currentDate);
    const now = new Date(selectedDate);
    now.setHours(now.getHours() + 9);
    await props.getSelectetInformation(now);
    let timeInformation = JSON.stringify(now);
    const result = timeInformation.substring(20, 25);
    const tmp = timeInformation.replace(result, "");
    await props.setEndString(tmp);
  };

  const [selectTime, setSelectTime] = useState(false);
  const onSelectTime = async () => {
    setSelectTime(!selectTime);
    if (selectTime == false) {
      setStartDate(new Date());
      setEndDate(new Date());
      await props.getSelectstInformation(new Date());
      await props.getSelectetInformation(new Date());
    } else if (selectTime == true) {
      await props.getSelectstInformation("");
      await props.getSelectetInformation("");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setSelectTime(false);
    }, [props.reset])
  );

  useEffect(() => {
    if (Device.osName === "iOS") {
      setStartDateOpen(true);
      setEndDateOpen(true);
      setStartMinuteOpen(true);
      setEndMinuteOpen(true);
    }
  }, []);

  return (
    <View>
      <View style={{ height: ScreenHeight / 20 }}>
        <Text style={{ fontSize: ScreenHeight / 45 }}>경매기간</Text>
      </View>
      <View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={onSelectTime}
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            >
              <View style={styles.radioButton}>
                {selectTime ? <RadioButton /> : null}
              </View>
              <Typography title="시작시간" style={styles.fontStyle} />
            </TouchableOpacity>
          </View>
          {selectTime == true ? (
            <View style={{ flex: 1.8 }}>
              {Device.osName === "Android" && (
                <FilterStartDateTimeAndroid
                  functions={{ setStartDateOpen, setStartMinuteOpen }}
                  states={{ startDateOpen, startMinuteOpen }}
                  date={startDate}
                />
              )}
              <View style={{ flexDirection: "row" }}>
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
                    style={{ flex: 2 }}
                  />
                )}
              </View>
            </View>
          ) : null}
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "center",
          }}
        ></View>
        <View style={{ marginTop: 10, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={onSelectTime}
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            >
              <View style={styles.radioButton}>
                {selectTime ? <RadioButton /> : null}
              </View>
              <Typography title="종료시간" style={styles.fontStyle} />
            </TouchableOpacity>
          </View>
          {selectTime == true ? (
            <View style={{ flex: 1.8 }}>
              {Device.osName === "Android" && (
                <FilterEndDateTimeAndroid
                  functions={{ setEndDateOpen, setEndMinuteOpen }}
                  states={{ endDateOpen, endMinuteOpen }}
                  date={endDate}
                />
              )}
              <View style={{ flexDirection: "row" }}>
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
                    style={{ flex: 2 }}
                  />
                )}
              </View>
            </View>
          ) : null}
        </View>
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
  fontStyle: {
    fontWeight: "200",
    marginLeft: ScreenHeight / 130,
    fontSize: ScreenHeight / 50,
  },
  radioButton: {
    height: ScreenHeight / 35,
    width: ScreenHeight / 35,
    borderRadius: ScreenHeight / 50,
    borderWidth: 1,
    borderColor: "#b8b4b4",
    alignItems: "center",
    justifyContent: "center",
  },
});
