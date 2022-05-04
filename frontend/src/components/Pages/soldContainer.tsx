import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import Sold from "../Templates/sold";

type Props = {
  navigation: any;
  route: object;
};

const SoldContainer = ({ navigation, route }: Props) => {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "SONY ILCE-7M",
      price: 12000,
      auctionType: "실시간",
      isSold: true,
      biddingCount: 5,
      startTime: "2022-04-27T21:48:40",
      endTime: "2022-06-30T13:27:18",
    },
    {
      id: 2,
      title: "SONY ILCE-7M3",
      price: 120000,
      auctionType: "일반",
      isSold: true,
      biddingCount: 10,
      startTime: "2022-04-27T21:48:40",
      endTime: "2022-06-30T13:27:18",
    },
    {
      id: 3,
      title: "SONY ILCE-7M3",
      price: 120000,
      auctionType: "실시간",
      isSold: true,
      biddingCount: 20,
      startTime: "2022-04-27T21:48:40",
      endTime: "2022-06-30T13:27:18",
    },
  ]);
  useEffect(() => {
    navigation.addListener("focus", () => {
      console.warn("Sold");
    });
  }, [navigation]);
  return <Sold items={items} />;
};

export default SoldContainer;

const styles = StyleSheet.create({});
