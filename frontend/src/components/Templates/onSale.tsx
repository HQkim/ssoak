import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import AuctionTypeTag from "../Atoms/Tags/auctionTypeTag";
import CompletedTag from "../Atoms/Tags/completedTag";
import { ScrollView } from "react-native-gesture-handler";

type Props = {};

const randomImage = require("../../../assets/temp.jpg");
const { height: ScreenHeight } = Dimensions.get("window");
const { width: ScreenWidth } = Dimensions.get("window");

const onSale = (props: Props) => {
  const items: any[] = [
    {
      id: 1,
      title: "SONY ILCE-7M333333",
      price: 12000,
      type: "실시간",
      isCompleted: false,
      biddingCount: 5,
      startTime: "2022-04-27T21:48:40",
      endTime: "2022-06-30T13:27:18",
    },
    {
      id: 2,
      title: "SONY ILCE-7M3",
      price: 120000,
      type: "일반",
      isCompleted: false,
      biddingCount: 10,
      startTime: "2022-04-27T21:48:40",
      endTime: "2022-06-30T13:27:18",
    },
    {
      id: 3,
      title: "SONY ILCE-7M3",
      price: 120000,
      type: "실시간",
      isCompleted: false,
      biddingCount: 20,
      startTime: "2022-04-27T21:48:40",
      endTime: "2022-06-30T13:27:18",
    },
  ];
  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      {items.map((item, index) => (
        <View key={index} style={styles.onSaleContainer}>
          <AuctionTypeTag
            styles={{ tag: styles.auctionTypeTag }}
            text={item.type}
          ></AuctionTypeTag>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 2 }}>
              <Image
                source={randomImage}
                style={{ width: ScreenHeight / 10, height: ScreenHeight / 10 }}
              />
            </View>
            <View style={{ flex: 6 }}>
              <Text style={{ fontSize: 18 }} numberOfLines={2}>
                {item.title}
              </Text>
              <Text>{item.isCompleted}</Text>
              <View style={{ flexDirection: "row" }}>
                <CompletedTag
                  styles={{ tag: styles.completedTypeTag }}
                  text={"진행중"}
                />
                <Text>참여자 : </Text>
                <TextInput
                  editable={false}
                  maxLength={3}
                  value={item.biddingCount
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  style={styles.textArea}
                  textAlign="center"
                />
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: ScreenWidth / 30 }}>
            <View style={{ flexDirection: "row", flex: 1 }}>
              <Text>시초가 : </Text>
              <TextInput
                editable={false}
                maxLength={3}
                value={item.biddingCount
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                style={styles.textArea}
                textAlign="center"
              />
            </View>
            <View style={{ flexDirection: "row", flex: 1, marginLeft: 19 }}>
              <Text>입찰가 : </Text>
              <TextInput
                editable={false}
                maxLength={3}
                value={item.biddingCount
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                style={styles.textArea}
                textAlign="center"
              />
            </View>
          </View>
          <View>
            <View style={{ flexDirection: "row", marginTop: ScreenWidth / 30 }}>
              <Text>경매일 : </Text>
              <TextInput
                editable={false}
                maxLength={30}
                value={item.startTime}
                style={styles.textAreaDate}
                textAlign="left"
              />
            </View>
          </View>
          <View
            style={{
              borderBottomColor: "#d7d4d4",
              borderBottomWidth: 1,
              marginTop: 15,
            }}
          ></View>
        </View>
      ))}
    </ScrollView>
  );
};

export default onSale;

const styles = StyleSheet.create({
  onSaleContainer: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  auctionTypeTag: {
    fontSize: 15,
    width: ScreenWidth / 6,
    backgroundColor: "#F8A33E",
    borderRadius: ScreenWidth / 12,
    textAlign: "center",
  },
  textArea: {
    borderRadius: 20,
    borderWidth: 0.5,
    height: 24,
    width: ScreenWidth / 4,
  },
  textAreaDate: {
    borderRadius: 20,
    borderWidth: 0.5,
    height: 24,
    // flex: 1,
    width: ScreenWidth * 0.73,
    paddingLeft: 8,
  },
  completedTypeTag: {
    fontSize: 15,
    width: ScreenWidth / 6,
    backgroundColor: "#C4C4C4",
    borderRadius: ScreenWidth / 12,
    textAlign: "center",
    marginRight: ScreenWidth / 12,
  },
});
