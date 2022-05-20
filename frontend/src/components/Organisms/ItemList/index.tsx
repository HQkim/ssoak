import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import AuctionTypeTag from "../../Atoms/Tags/auctionTypeTag";
import ItemInforms from "../../Molecules/ItemInfo/itemInforms";
import { useNavigation } from "@react-navigation/native";
import CompletedTag from "../../Atoms/Tags/completedTag";

type Props = {
  items: Array<object>;
};

const randomImage = require("../../../../assets/temp.jpg");
const { height: ScreenHeight } = Dimensions.get("window");
const { width: ScreenWidth } = Dimensions.get("window");

const Index = ({ items, containerStyle }) => {
  const navigation: any = useNavigation();
  const goDetail = (item) => {
    if (item.auctionType == "NORMAL") {
      navigation.navigate("auctionDetail", {
        id: item.itemSeq,
      });
    } else {
      navigation.navigate("detail", {
        id: item.itemSeq,
      });
    }
  };

  return (
    <View style={containerStyle}>
      {items &&
        items.map((item, index) => (
          <View key={index} style={{ marginTop: 20 }}>
            <TouchableOpacity onPress={() => goDetail(item)}>
              <View style={{ flexDirection: "row" }}>
                <AuctionTypeTag
                  styles={{ tag: styles.auctionTypeTag }}
                  text={item.auctionType == "LIVE" ? "실시간" : "일반"}
                ></AuctionTypeTag>
                <CompletedTag
                  styles={{ tag: styles.completedTypeTag }}
                  text={item.isSold == true ? "거래완료" : "기간초과"}
                />
              </View>
              <ItemInforms item={item} />
              <View
                style={{
                  borderBottomColor: "#d7d4d4",
                  borderBottomWidth: 1,
                  marginTop: 15,
                }}
              ></View>
            </TouchableOpacity>
          </View>
        ))}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  auctionTypeTag: {
    width: ScreenWidth / 6,
    height: ScreenHeight / 33,
    backgroundColor: "#F8A33E",
    borderRadius: 55,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 5,
  },
  textAreaDate: {
    borderRadius: 20,
    borderWidth: 0.5,
    height: 24,
    width: ScreenWidth * 0.73,
    paddingLeft: 8,
  },
  completedTypeTag: {
    width: ScreenWidth / 6,
    height: ScreenHeight / 33,
    backgroundColor: "#719DD7",
    borderRadius: 55,
    marginRight: ScreenWidth / 12,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
});
