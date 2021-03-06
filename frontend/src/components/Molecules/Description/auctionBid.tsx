// auctionBid

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  LayoutAnimation,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useCallback } from "react";
import BidCard from "../../Molecules/Cards/bidCard";

const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get("window");

const AuctionBid = ({ item, reqItem, getItemDetail }) => {
  return (
    <View style={styles.Container}>
      <BidCard
        reqItem={reqItem}
        item={item}
        title={"시초가 10% 추가"}
        button={"즉시입찰"}
        edit={false}
        biddingUnit={item.biddingUnit}
        getItemDetail={getItemDetail}
      ></BidCard>
      <BidCard
        reqItem={reqItem}
        item={item}
        title={"직접 입력하기"}
        button={"입찰하기"}
        edit={true}
        biddingUnit={item.startPrice}
        getItemDetail={getItemDetail}
      ></BidCard>
    </View>
  );
};

export default AuctionBid;

const styles = StyleSheet.create({
  Container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
});
