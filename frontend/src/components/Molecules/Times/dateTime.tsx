import DateTimePicker from "@react-native-community/datetimepicker";
import { View } from "react-native";
import React, { useState } from "react";

const DateTime = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    // console.warn(currentDate);
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={"date"}
        is24Hour={true}
        minimumDate={date}
        locale="ko-KR"
        onChange={onChange}
        style={{ flex: 2 }}
      />
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={"time"}
        is24Hour={true}
        locale="ko-KR"
        onChange={onChange}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default DateTime;
