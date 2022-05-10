import { StyleSheet, Text, View, TextInput, Dimensions } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { searchItem } from "../../../apis/categoryApi";

type Props = {
  style: object;
  text: any;
  setText: Function;
};

const { width: ScreenWidth } = Dimensions.get("window");
const { height: ScreenHeight } = Dimensions.get("window");

const NavigatorTextInput = (props: Props) => {
  // const keyword = props.text;
  const searchKeyword = async (text) => {
    const keyword = text;
    console.log(keyword);
    await searchItem(keyword);
  };

  return (
    <View>
      <TextInput
        style={props.style}
        onChangeText={(text) => props.setText(text)}
        value={props.text}
      />
      {props.text ? (
        <Ionicons
          name="search-outline"
          size={35}
          color="black"
          style={{
            position: "absolute",
            left: ScreenWidth / 2 + 10,
            justifyContent: "center",
          }}
          onPress={() => searchKeyword(props.text)}
        />
      ) : null}
    </View>
  );
};

export default NavigatorTextInput;

const styles = StyleSheet.create({});
