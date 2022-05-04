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
                maxLength={10}
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
                maxLength={10}
                textInputStyle={styles.textArea}
              />
            </View>
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
          <View style={{ marginTop: ScreenWidth / 30 }}>
            <View style={{ flexDirection: "row", flex: 1 }}>
              <Text>시작날짜 : </Text>
              <ItemTextInput
                value={item.startTime}
                textAlign={"center"}
                maxLength={20}
                textInputStyle={styles.textAreaDate}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                marginTop: ScreenWidth / 40,
              }}
            >
              <Text>종료날짜 : </Text>
              <ItemTextInput
                value={item.endTime}
                textAlign={"center"}
                maxLength={20}
                textInputStyle={styles.textAreaDate}
              />
            </View>
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
    borderRadius: 20,
    borderWidth: 0.5,
    height: 24,
    width: ScreenWidth / 2,
  },
});
