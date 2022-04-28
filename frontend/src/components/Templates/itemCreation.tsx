import {
  View,
  StyleSheet,
  SafeAreaView,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import ItemCreationInput from "../Organisms/Input/itemCreationInput";

const { height: ScreenHeight } = Dimensions.get("window");

const ItemCreation = () => {
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
            <ItemCreationInput inputForm={inputForm} />
          </SafeAreaView>
          <View style={{ alignItems: "center", padding: ScreenHeight / 50 }}>
            <View style={styles.buttonContainer}>
              <Button title="등록하기" onPress={onSubmit} color={"#ffff"} />
            </View>
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
  },
});

export default ItemCreation;
