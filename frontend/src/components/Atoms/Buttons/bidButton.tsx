import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { biddingAuction } from "../../../apis/auctionApi";

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");

const BidButton = ({ button, reqItem }) => {
  const bidding = async () => {
    const formData = new FormData();
    const item: any = 1300;
    const hammer: any = true;
    formData.append("biddingPrice", item);
    formData.append("isHammered", hammer);

    const result = await biddingAuction(reqItem, formData);
    console.warn(result);
  };
  return (
    <TouchableOpacity style={styles.buttonContainer}>
      <Text style={styles.textStyle} onPress={bidding}>
        {button}
      </Text>
    </TouchableOpacity>
  );
};

export default BidButton;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#0176B7",
    width: ScreenWidth / 5,
    height: ScreenWidth / 13,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: "#ffffff",
    fontSize: ScreenWidth / 28,
  },
});
