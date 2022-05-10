import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import AuctionTypeTag from "../../Atoms/Tags/auctionTypeTag";
import ItemInforms from "../../Molecules/ItemInfo/itemInforms";
import { useNavigation } from "@react-navigation/native";

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
