import { StyleSheet, Text, View, Dimensions, TextInput } from "react-native";
import React, { useState } from "react";

type Props = {
  getSelectInformation: Function;
  navigation: any;
  route: object;
};
const { height: ScreenHeight } = Dimensions.get("window");
const { width: ScreenWidth } = Dimensions.get("window");

const TimeRange = (props: Props) => {
  const [select, setSelect] = useState(true);
  const [startPrice, setStartPrice] = useState("");
  const [endPrice, setEndPrice] = useState("");
  const inputStartPrice = (text) => {
    setStartPrice(text);
  };
  const inputEndPrice = (text) => {
    setEndPrice(text);
  };
  const onSelect = () => {
    setSelect(!select);
    props.getSelectInformation(select);
  };
  return (
    <View>
      <View style={{ height: ScreenHeight / 20 }}>
        <Text style={{ fontSize: ScreenHeight / 45 }}>시작시간</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TextInput
          maxLength={15}
          keyboardType="numeric"
          value={startPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          style={styles.textArea}
          textAlign="left"
          onChangeText={(text) => inputStartPrice(text)}
        />
        <View>
          <Text>~</Text>
        </View>
        <TextInput
          maxLength={15}
          keyboardType="numeric"
          value={endPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          style={styles.textArea}
          textAlign="left"
          onChangeText={(text) => inputEndPrice(text)}
        />
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
