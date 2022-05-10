import { StyleSheet, View, Dimensions, Text } from "react-native";
import React from "react";
import AuctionBid from "../Molecules/Description/auctionBid";
import CountDown from "../Atoms/Typographies/countDown";

const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get("window");

const Action = ({ item, reqItem, getItemDetail }) => {
  return (
    <View>
      <Text style={styles.timeStyle}>
        경매 종료 시간 :{" "}
        <CountDown style={styles.timeStyle} endTime={item.endTime} />
      </Text>
      <Text style={styles.titleStyle}>입찰 참여하기</Text>
      <Text style={styles.descriptionStyle}>
        입찰 참여 시 취소할 수 없습니다. 확인 후 입찰해주세요.
      </Text>
      <AuctionBid item={item} reqItem={reqItem} getItemDetail={getItemDetail} />
    </View>
  );
};

export default Action;

const styles = StyleSheet.create({
  timeStyle: {
    fontSize: ScreenWidth / 20,
    fontWeight: "200",
    textAlign: "center",
    marginTop: ScreenHeight / 6,
  },
  titleStyle: {
    fontSize: ScreenWidth / 20,
    fontWeight: "200",
    marginTop: ScreenHeight / 30,
    marginBottom: 2,
    paddingLeft: 20,
    paddingRight: 20,
  },
  descriptionStyle: {
    fontSize: ScreenWidth / 24,
    fontWeight: "100",
    color: "#747474",
    paddingLeft: 20,
    paddingRight: 20,
  },
});
