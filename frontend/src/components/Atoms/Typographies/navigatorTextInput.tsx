import { StyleSheet, Text, View, TextInput, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { searchItem } from "../../../apis/categoryApi";

type Props = {
  style: object;
  text: any;
  setText: Function;
  setItems: any;
  page: number;
  setPage: Function;
  form: any;
  setForm: Function;
};

interface Form {
  keyword: string;
  page: number;
}

const { width: ScreenWidth } = Dimensions.get("window");

const NavigatorTextInput = (props: Props) => {
  const [test, setTest] = useState([]);
  const searchKeyword = async (text) => {
    console.log(props.form.form);
    const result = await searchItem(props.form.form);

    props.setItems(result);
    // props.setPage((prev) => prev + 1);
    props.form.form.page = props.page + 1;
  };

  useEffect(() => {
    if (props.text) {
      props.form.form.keyword = props.text;
      props.form.form.page = 1;
    }
  }, [props.text]);

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
