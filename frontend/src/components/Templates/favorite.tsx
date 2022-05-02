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

type Props = {};

const randomImage = require("../../../assets/temp.jpg");
const { height: ScreenHeight } = Dimensions.get("window");
const { width: ScreenWidth } = Dimensions.get("window");

const Favorite = (props: Props) => {
  const [heart, setHeart] = useState(true);
  const items: any[] = [
    {
      id: 1,
      title:
        "SONY ILCE-7M3 팝니다SONY ILCE-7M3 팝니다SONY ILCE-7M3 팝니다SONY ILCE-7M3 팝니다",
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

  const pressHeart = () => {
    setHeart((prev) => !prev);
  };
  return (
    <View>
      {items.map((item, index) => (
        <View key={index} style={styles.favListContainer}>
          <View>
            {item.type === "실시간" ? (
              <Text
                style={{
                  fontSize: 15,
                  width: ScreenWidth / 6,
                  backgroundColor: "#EA759A",
                  borderRadius: ScreenWidth / 12,
                  textAlign: "center",
                }}
              >
                실시간
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 15,
                  width: ScreenWidth / 6,
                  backgroundColor: "#F8A33E",
                  borderRadius: ScreenWidth / 12,
                  textAlign: "center",
                }}
              >
                일반
              </Text>
            )}
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 1 }}>
              <Image
                source={randomImage}
                style={{ width: ScreenHeight / 10, height: ScreenHeight / 10 }}
              />
            </View>
            <View style={{ flex: 2 }}>
              <Text style={{ fontSize: 18 }} numberOfLines={2}>
                {item.title}
              </Text>
              <Text>{item.isCompleted}</Text>
              <View style={{ flexDirection: "row" }}>
                {item.isCompleted === true ? (
                  <Text style={{ flex: 1 }}>거래완료</Text>
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
                  <Ionicons name="heart" size={24} color="#FF7777" />
                ) : (
                  <Ionicons name="heart" size={24} color="black" />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: "#7D7D7D",
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
});
