import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import React from "react";

const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get("window");

const ActionNull = () => {
  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <Text style={styles.textContainer}>현재 입찰자</Text>
        <View style={styles.cardContainer}>
          <Text style={{ fontSize: ScreenWidth / 24 }}>
            현재 입찰 정보가 없습니다.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ActionNull;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  boxContainer: {
    width: "100%",
    height: ScreenWidth / 1.6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0176B7",
  },
  textContainer: {
    color: "#ffffff",
    fontSize: ScreenWidth / 20,
    marginTop: ScreenHeight / 5,
    marginBottom: ScreenHeight / 80,
  },
  cardContainer: {
    alignItems: "center",
    justifyContent: "space-around",
    width: ScreenWidth / 1.6,
    height: ScreenWidth / 1.7,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "rgb(50, 50, 50)",
    shadowOpacity: 0.8,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
});
