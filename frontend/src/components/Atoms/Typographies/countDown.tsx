import { StyleSheet, Text, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import Countdown, { zeroPad } from "react-countdown";
type Props = {};

const CountDown = ({ style, endTime }) => {
  const [parsedTime, setParsedTime] = useState(new Date(Date.parse(endTime)));
  useEffect(() => {
    Platform.OS === "android" &&
      setParsedTime(new Date(Date.parse(endTime) - 9000 * 60 * 60));
  }, []);
  return (
    <Countdown
      date={parsedTime}
      intervalDelay={0}
      precision={0}
      // daysInHours={true}
      renderer={({ days, hours, minutes, seconds }) => (
        <Text style={style}>
          {Number(zeroPad(hours)) + Number(zeroPad(days)) * 24}시간{" "}
          {zeroPad(minutes)}분 {zeroPad(seconds)}초
        </Text>
      )}
    />
  );
};

export default CountDown;

const styles = StyleSheet.create({});
