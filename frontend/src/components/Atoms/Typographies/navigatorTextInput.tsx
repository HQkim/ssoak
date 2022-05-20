import { StyleSheet, Text, View, TextInput, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { searchItem, searchItemWithoutToken } from "../../../apis/categoryApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

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
  const [isLogin, setIsLogin] = useState(false);
  const navigation = useNavigation();
  const searchKeyword = async (text) => {
    props.setItems([]);
    props.form.form.page = 1;
    if (isLogin == true) {
      console.log("로그인한상태");
      const result = await searchItem(props.form.form);
      props.setItems(result);
    } else {
      console.log("미로그인상태");
      const result = await searchItemWithoutToken(props.form.form);
      props.setItems(result);
    }
  };

  const getAccessToken = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    if (typeof token == "string") {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  useEffect(() => {
    if (props.text) {
      props.form.form.keyword = props.text;
      props.form.form.page = 1;
    } else {
      props.setItems([]);
    }
  }, [props.text]);

  useEffect(() => {
    navigation.addListener("focus", () => {
      getAccessToken();
    });
  }, [navigation]);

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
