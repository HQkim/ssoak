import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import Typography from "../Atoms/Text/typography";
import ItemCreationInput from "../Organisms/Input/itemCreationInput";

const { height: ScreenHeight } = Dimensions.get("window");

const ItemCreation = () => {
  const onSubmit = () => {
    console.warn(1);
  };
  const inputForm = (form: any) => {
    console.warn(form);
  };
  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <SafeAreaView>
            <View style={styles.titleContainer}>
              <Typography
                title={"경매물품 등록하기"}
                style={{ fontSize: ScreenHeight / 35, fontWeight: "200" }}
              />
            </View>
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
  },
  titleContainer: {
    alignItems: "center",
    padding: ScreenHeight / 30,
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
