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

const AuctionBidInformation = ({ item }) => {
  const mainImage = item.itemImages[0];
  const time = new Date(item.bidding.biddingDate);
  time.setHours(time.getHours() + 9);

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <Text style={styles.textContainer}>현재 입찰자</Text>
        <Image
          source={{ uri: item.bidding.buyer.profileImageUrl }}
          style={styles.profileContainer}
        ></Image>
        <View style={styles.cardContainer}>
          <Text style={styles.titleStyle}>{item.bidding.buyer.nickname}</Text>
          <View style={{ alignItems: "center" }}>
            <Image
              source={{ uri: mainImage }}
              style={styles.imgContainer}
            ></Image>
            <Text style={styles.title2Style}>현재 입찰가</Text>
            <Text style={styles.priceStyle}>
              {item.bidding.biddingPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              원
            </Text>
          </View>
          <Text style={styles.title2Style}>
            입찰 시간 : {new Date(time).toLocaleDateString("ko-KR")}{" "}
            {new Date(time).toLocaleTimeString("ko-KR")}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AuctionBidInformation;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    width: ScreenWidth / 5,
    height: ScreenWidth / 5,
    borderRadius: 55,
    zIndex: 1,
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
    marginBottom: ScreenHeight / 100,
  },
  cardContainer: {
    position: "relative",
    top: -30,
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
  imgContainer: {
    width: ScreenWidth / 4.5,
    height: ScreenWidth / 4.5,
  },
  titleStyle: {
    fontSize: ScreenWidth / 23,
    fontWeight: "300",
    marginTop: 25,
  },
  title2Style: {
    fontSize: ScreenWidth / 27,
    fontWeight: "300",
    color: "#807E7E",
  },
  priceStyle: {
    fontSize: ScreenWidth / 17,
    color: "#0176B7",
  },
});
