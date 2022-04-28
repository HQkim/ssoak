import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {};

const AuctionChat = (props: Props) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "red" }}></View>
      <View style={{ flex: 1, backgroundColor: "blue" }}>
        <View style={{ flex: 1, backgroundColor: "black" }}>
          <View
            style={{
              flex: 1,
              backgroundColor: "#111111",
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 1, backgroundColor: "#aa0000" }}></View>
            <View style={{ flex: 8, backgroundColor: "#00aa00" }}></View>
            <View style={{ flex: 1, backgroundColor: "#0000aa" }}></View>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "#999999",
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 1, backgroundColor: "#00bb00" }}></View>
            <View style={{ flex: 1, backgroundColor: "#00bbbb" }}></View>
            <View style={{ flex: 1, backgroundColor: "#bbbb00" }}></View>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 1, backgroundColor: "#00bb00" }}></View>
            <View style={{ flex: 1, backgroundColor: "#00bbbb" }}></View>
            <View style={{ flex: 1, backgroundColor: "#bbbb00" }}></View>
          </View>
        </View>
        <View style={{ flex: 2, backgroundColor: "grey" }}></View>
      </View>
    </View>
  );
};

export default AuctionChat;

const styles = StyleSheet.create({});
