import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

type counterProps = {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onIncreaseBy: (diff: number) => void;
};

const main = (props: counterProps) => {
  return (
    <View
      style={{ width: "75%", justifyContent: "center", alignItems: "center" }}
    >
      <Text style={{ marginBottom: 20 }}>
        Team 207.{"\n"}이 App은 Ducks design for Redux and Redux-saga와 Atomic
        design pattern을 바탕으로 씌어진 스켈레톤 코드입니다.{"\n"}
        {"\n"}
        check the "src/store/modules/" for redux elements {"\n"}
        {"&"}
        {"\n"}
        check "src/components/" for atomic design pattern{"\n"}
      </Text>
      <Text style={{ fontWeight: "bold" }}>Happy hacking;</Text>
      <Text style={{ marginBottom: 20 }}>redux state value: {props.value}</Text>
      <View style={styles.buttonContainer}>
        <Pressable onPress={props.onIncrease} style={styles.increaseButton}>
          <Text>+1</Text>
        </Pressable>
        <Pressable onPress={props.onDecrease} style={styles.increaseButton}>
          <Text>-1</Text>
        </Pressable>
        <Pressable
          onPress={() => props.onIncreaseBy(5)}
          style={styles.increaseButton}
        >
          <Text>+5</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default main;

const styles = StyleSheet.create({
  increaseButton: {
    padding: 35,
    borderRadius: 40,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: "blue",
    shadowRadius: 5,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
