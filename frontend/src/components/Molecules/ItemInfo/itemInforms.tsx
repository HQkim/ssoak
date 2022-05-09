import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import ItemImage from "../../Atoms/Items/itemsImage";
import ItemTitle from "../../Atoms/Items/itemTitle";
import ItemTextInput from "../../Atoms/Items/itemTextInput";
import CompletedTag from "../../Atoms/Tags/completedTag";

type Props = {};
const source = require("../../../../assets/temp.jpg");
const { height: ScreenHeight } = Dimensions.get("window");
const { width: ScreenWidth } = Dimensions.get("window");

const ItemInforms = ({ item }) => {
  return (
    <View>
      {item.isSold === true ? (
        <>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 2 }}>
              <ItemImage source={source} imageStyle={styles.imageStyle} />
            </View>
            <View style={{ flex: 6, justifyContent: "space-between" }}>
              <ItemTitle
                titleStyle={styles.titleStyle}
                numberOfLines={2}
                value={item.title}
              />
              <View style={{ flexDirection: "row" }}>
                <CompletedTag
                  styles={{ tag: styles.completedTypeTag }}
                  text={"거래완료"}
                />
                <Text>참여자 : </Text>
                <ItemTextInput
                  value={item.biddingCount
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  textAlign={"center"}
                  maxLength={3}
                  textInputStyle={styles.textArea}
                />
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: ScreenWidth / 30 }}>
            <View style={{ flexDirection: "row", flex: 1 }}>
              <Text>시초가 : </Text>
              <ItemTextInput
                value={item.biddingCount
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                textAlign={"center"}
                maxLength={7}
                textInputStyle={styles.textArea}
              />
            </View>
            <View style={{ flexDirection: "row", flex: 1, marginLeft: 19 }}>
              <Text>입찰가 : </Text>
              <ItemTextInput
                value={item.biddingCount
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                textAlign={"center"}
                maxLength={7}
                textInputStyle={styles.textArea}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: ScreenWidth / 30 }}>
            <Text>경매일 : </Text>
            <ItemTextInput
              value={
                item.auctionType == "LIVE"
                  ? item.startTime.split("T")[0] +
                    "-" +
                    item.startTime.split("T")[1]
                  : item.startTime.split("T")[0] +
                    "-" +
                    item.startTime.split("T")[1].slice(0, 5) +
                    " ~ " +
                    item.endTime.split("T")[0] +
                    "-" +
                    item.endTime.split("T")[1].slice(0, 5)
              }
              textAlign={"left"}
              maxLength={50}
              textInputStyle={styles.textAreaDate}
            />
          </View>
        </>
      ) : (
        <>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 2 }}>
              <ItemImage source={source} imageStyle={styles.imageStyle} />
            </View>
            <View style={{ flex: 6, justifyContent: "space-between" }}>
              <ItemTitle
                titleStyle={styles.titleStyle}
                numberOfLines={2}
                value={item.title}
              />
              <View style={{ flexDirection: "row" }}>
                <CompletedTag
                  styles={{ tag: styles.completedTypeTag }}
                  text={"기간초과"}
                />
                <Text>시초가 : </Text>
                <ItemTextInput
                  value={item.startPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  textAlign={"center"}
                  maxLength={15}
                  textInputStyle={styles.textArea}
                />
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: ScreenWidth / 30 }}>
            <Text>경매일 : </Text>
            <ItemTextInput
              value={
                item.auctionType == "LIVE"
                  ? item.startTime.split("T")[0] +
                    "-" +
                    item.startTime.split("T")[1]
                  : item.startTime.split("T")[0] +
                    "-" +
                    item.startTime.split("T")[1].slice(0, 5) +
                    " ~ " +
                    item.endTime.split("T")[0] +
                    "-" +
                    item.endTime.split("T")[1].slice(0, 5)
              }
              textAlign={"left"}
              maxLength={50}
              textInputStyle={styles.textAreaDate}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default ItemInforms;

const styles = StyleSheet.create({
  imageStyle: {
    width: ScreenHeight / 10,
    height: ScreenHeight / 10,
  },
  titleStyle: {
    fontSize: 18,
  },
  completedTypeTag: {
    fontSize: 15,
    width: ScreenWidth / 6,
    backgroundColor: "#C4C4C4",
    borderRadius: ScreenWidth / 12,
    textAlign: "center",
    marginRight: ScreenWidth / 12,
  },
  textArea: {
    borderRadius: 20,
    borderWidth: 0.5,
    height: 24,
    width: ScreenWidth / 4,
  },
  textAreaDate: {
    // borderRadius: 20,
    // borderWidth: 0.5,
    // height: 24,
    // width: ScreenWidth / 2,
    borderRadius: 20,
    borderWidth: 0.5,
    height: 24,
    width: ScreenWidth * 0.73,
    paddingLeft: 8,
  },
});
