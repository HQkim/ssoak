import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import AuctionTypeTag from "../Atoms/Tags/auctionTypeTag";
import CompletedTag from "../Atoms/Tags/completedTag";

type Props = {};

const randomImage = require("../../../assets/temp.jpg");
const { height: ScreenHeight } = Dimensions.get("window");
const { width: ScreenWidth } = Dimensions.get("window");

const Favorite = (props: Props) => {
  const [heart, setHeart] = useState(true);
  const items: any[] = [
    {
      id: 1,
      title: "SONY ILCE-7M333333",
      price: 12000,
      type: "실시간",
      isCompleted: true,
      heart: true,
    },
    {
      id: 2,
      title: "SONY ILCE-7M3",
      price: 120000,
      type: "일반",
      isCompleted: false,
      heart: true,
    },
    {
      id: 3,
      title: "SONY ILCE-7M3",
      price: 120000,
      type: "실시간",
      isCompleted: false,
      heart: true,
    },
  ];
  const goDetail = () => {
    console.warn("상세목록으로 이동");
    // navigation.navigate("/")
  };

  const pressHeart = () => {
    setHeart((prev) => !prev);
  };
  return (
    <View>
      {items.map((item, index) => (
        <View key={index} style={styles.favListContainer}>
          <View>
            <AuctionTypeTag
              styles={{ tag: styles.auctionTypeTag }}
              text={item.type}
            ></AuctionTypeTag>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 2 }}>
              <Image
                source={randomImage}
                style={{ width: ScreenHeight / 10, height: ScreenHeight / 10 }}
              />
            </View>
            <View style={{ flex: 4 }}>
              <Text style={{ fontSize: 18 }} numberOfLines={2}>
                {item.title}
              </Text>
              <Text>{item.isCompleted}</Text>
              <View style={{ flexDirection: "row" }}>
                {item.isCompleted === true ? (
                  <CompletedTag
                    styles={{ tag: styles.completedTypeTag }}
                    text={"거래완료"}
                  />
                ) : (
                  <Text style={{ fontSize: 15, flex: 1 }}>현재 입찰가 :</Text>
                )}
                <TextInput
                  editable={false}
                  maxLength={15}
                  value={item.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  style={styles.textArea}
                  textAlign="center"
                />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity onPress={() => pressHeart}>
                {item.heart === true ? (
                  <Ionicons name="heart" size={24} color="#EA759A" />
                ) : (
                  <Ionicons name="heart" size={24} color="black" />
                )}
              </TouchableOpacity>
            </View>
          </View>
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

export default Favorite;

const styles = StyleSheet.create({
  favListContainer: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  textArea: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 0.5,
    height: 24,
  },
  auctionTypeTag: {
    fontSize: 15,
    width: ScreenWidth / 6,
    backgroundColor: "#F8A33E",
    borderRadius: ScreenWidth / 12,
    textAlign: "center",
  },
  completedTypeTag: {
    fontSize: 15,
    width: ScreenWidth / 6,
    backgroundColor: "#C4C4C4",
    borderRadius: ScreenWidth / 12,
    textAlign: "center",
    marginRight: ScreenWidth / 12,
  },
});
