import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import NotSold from "../Templates/notSold";

type Props = {
  navigation: any;
  route: object;
};

const NotSoldContainer = ({ navigation, route }: Props) => {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "SONY ILCE-7M",
      startPrice: 12000,
      auctionType: "실시간",
      isSold: false,
      biddingCount: 0,
      startTime: "2022-04-27T21:48:40",
      endTime: "2022-06-30T13:27:18",
    },
    {
      id: 2,
      title: "SONY ILCE-7M",
      startPrice: 12000,
      auctionType: "실시간",
      isSold: false,
      biddingCount: 0,
      startTime: "2022-04-27T21:48:40",
      endTime: "2022-06-30T13:27:18",
    },
    {
      id: 3,
      title: "SONY ILCE-7M",
      startPrice: 12000,
      auctionType: "실시간",
      isSold: false,
      biddingCount: 0,
      startTime: "2022-04-27T21:48:40",
      endTime: "2022-06-30T13:27:18",
    },
  ]);
  useEffect(() => {
    navigation.addListener("focus", () => {
      console.warn("NotSold");
    });
  }, [navigation]);
  return <NotSold items={items} />;
};

export default NotSoldContainer;

const styles = StyleSheet.create({});
