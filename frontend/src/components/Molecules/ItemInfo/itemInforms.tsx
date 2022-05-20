import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import ItemImage from "../../Atoms/Items/itemsImage";
import ItemTitle from "../../Atoms/Items/itemTitle";
import ItemTextInput from "../../Atoms/Items/itemTextInput";
import CompletedTag from "../../Atoms/Tags/completedTag";

type Props = {};
const { height: ScreenHeight } = Dimensions.get("window");
const { width: ScreenWidth } = Dimensions.get("window");

const ItemInforms = ({ item }) => {
  return (
    <View>
      <View style={{ flexDirection: "row", marginTop: ScreenWidth / 50 }}>
        <ItemImage
          source={{ uri: item.imageUrl }}
          imageStyle={styles.imageStyle}
        />

        <View
          style={{
            flexDirection: "row",
            flex: 3,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-around",
              height: ScreenWidth / 3.2,
            }}
          >
            <Text
              style={{
                fontSize: ScreenWidth / 18,
                marginLeft: ScreenWidth / 20,
              }}
              numberOfLines={1}
            >
              {item.title}
            </Text>
            <Text
              style={{
                fontSize: ScreenWidth / 24,
                marginTop: ScreenWidth / 70,
                marginLeft: ScreenWidth / 20,
              }}
            >
              참여자 : {item.biddingCount} 명
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginLeft: 19,
                marginTop: ScreenWidth / 70,
              }}
            >
              <Text
                style={{
                  fontSize: ScreenWidth / 24,
                  alignSelf: "center",
                }}
              >
                시초가 :{" "}
              </Text>
              <ItemTextInput
                maxLength={10}
                value={
                  item.startPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 원"
                }
                textInputStyle={styles.textArea}
                textAlign="center"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                marginLeft: 19,
                marginTop: ScreenWidth / 70,
              }}
            >
              <Text
                style={{
                  fontSize: ScreenWidth / 24,
                  alignSelf: "center",
                }}
              >
                {item.isSold == true ? "낙찰가 : " : "입찰가 : "}
              </Text>
              <ItemTextInput
                maxLength={10}
                value={
                  item.isSold == true
                    ? item.lastPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 원"
                    : 0 + " 원"
                }
                textInputStyle={styles.textArea}
                textAlign="center"
              />
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: ScreenWidth / 30,
          alignItems: "center",
        }}
      >
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
    </View>
  );
};

export default ItemInforms;

const styles = StyleSheet.create({
  imageStyle: {
    width: ScreenWidth / 3.2,
    height: ScreenWidth / 3.2,
    borderColor: "#d7d4d4",
    borderWidth: 1,
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
    width: ScreenWidth * 0.73,
    paddingLeft: 8,
  },
});
