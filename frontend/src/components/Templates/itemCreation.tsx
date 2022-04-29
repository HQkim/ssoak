import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  Text,
} from "react-native";
import React, { useState } from "react";
import ItemCreationInput from "../Organisms/Input/itemCreationInput";
import { NumberFormatValues } from "react-number-format";

const { height: ScreenHeight } = Dimensions.get("window");

type Props = {
  navigation: any;
  route: object;
};

const ItemCreation = (props: Props) => {
  const onSubmit = () => {
    // console.warn(1);
  };
  const inputForm = (form: any) => {
    // console.warn(form);
  };
  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <SafeAreaView>
            <ItemCreationInput
              navigation={props.navigation}
              route={props.route}
              inputForm={inputForm}
              onSubmit={onSubmit}
            />
          </SafeAreaView>
          <View style={{ alignItems: "center", padding: ScreenHeight / 50 }}>
            <TouchableOpacity style={styles.buttonContainer} onPress={onSubmit}>
              <Text style={styles.textContainer}>등록하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: ScreenHeight / 80,
  },
  buttonContainer: {
    backgroundColor: "#0176B7",
    width: "100%",
    borderRadius: 5,
    height: ScreenHeight / 17,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    color: "#ffffff",
    fontWeight: "200",
    fontSize: ScreenHeight / 40,
  },
});

export default ItemCreation;
