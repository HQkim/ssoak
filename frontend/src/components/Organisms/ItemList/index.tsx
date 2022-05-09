import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import AuctionTypeTag from "../../Atoms/Tags/auctionTypeTag";
import ItemInforms from "../../Molecules/ItemInfo/itemInforms";

type Props = {
  items: Array<object>;
  navigation: any;
  route: object;
};

const randomImage = require("../../../../assets/temp.jpg");
const { height: ScreenHeight } = Dimensions.get("window");
const { width: ScreenWidth } = Dimensions.get("window");

const Index = ({ items, containerStyle, navigation, route }) => {
  const goItemDetail = (id: number) => {
    navigation.navigate("auctionDetail", {
      id: id,
    });
  };

  return (
    <View style={containerStyle}>
      {items &&
        items.map((item, index) => (
          <View key={index} style={{ marginTop: 20 }}>
            <TouchableOpacity onPress={() => goItemDetail(item.itemSeq)}>
              <AuctionTypeTag
                styles={{ tag: styles.auctionTypeTag }}
                text={item.auctionType == "LIVE" ? "실시간" : "일반"}
              ></AuctionTypeTag>
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
    fontSize: 15,
    width: ScreenWidth / 6,
    backgroundColor: "#F8A33E",
    borderRadius: ScreenWidth / 12,
    textAlign: "center",
  },
  textAreaDate: {
    borderRadius: 20,
    borderWidth: 0.5,
    height: 24,
    width: ScreenWidth * 0.73,
    paddingLeft: 8,
  },
});
