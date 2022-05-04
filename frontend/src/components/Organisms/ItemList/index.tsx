import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
} from "react-native";
import React from "react";
import AuctionTypeTag from "../../Atoms/Tags/auctionTypeTag";
import ItemInforms from "../../Molecules/ItemInfo/itemInforms";
// import ItemTextInput from "../../Atoms/Items/itemTextInput";

type Props = {};

const randomImage = require("../../../../assets/temp.jpg");
const { height: ScreenHeight } = Dimensions.get("window");
const { width: ScreenWidth } = Dimensions.get("window");

const Index = ({ items, containerStyle }) => {
  return (
    <View style={containerStyle}>
      {items.map((item, index) => (
        <View key={index} style={{ marginTop: 20 }}>
          <AuctionTypeTag
            styles={{ tag: styles.auctionTypeTag }}
            text={item.auctionType}
          ></AuctionTypeTag>
          <ItemInforms item={item} />
          {item.isSold === true ? (
            <>
              <View>
                <View
                  style={{ flexDirection: "row", marginTop: ScreenWidth / 30 }}
                >
                  <Text>경매일 : </Text>
                  <TextInput
                    editable={false}
                    maxLength={30}
                    value={item.startTime}
                    style={styles.textAreaDate}
                    textAlign="left"
                  />
                </View>
              </View>
            </>
          ) : null}
          <View
            style={{
              borderBottomColor: "#d7d4d4",
              borderBottomWidth: 1,
              marginTop: 15,
            }}
          ></View>
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
