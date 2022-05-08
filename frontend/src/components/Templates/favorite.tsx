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
import { getFavoriteItems } from "../../apis/ItemApi";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { likeItem } from "../../apis/autcionApi";
import { cancelLikeItem } from "../../apis/autcionApi";

type Props = {
  navigation: any;
  route: object;
};

type Items = {
  items: Array<object>;
};

const randomImage = require("../../../assets/temp.jpg");
const { height: ScreenHeight } = Dimensions.get("window");
const { width: ScreenWidth } = Dimensions.get("window");

const Favorite = (props: Props) => {
  const [heart, setHeart] = useState(true);
  const [items, setItems] = useState<Items | null | any>([]);
  const getData = async () => {
    const response = await getFavoriteItems();
    setItems(response);
  };
  const goDetail = () => {
    console.warn("상세목록으로 이동");
    // navigation.navigate("/")
  };

  const pressHeart = async (id: number) => {
    if (heart == true) {
      setHeart(false);
      await cancelLikeItem(id);
    } else {
      setHeart(true);
      await likeItem(id);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
      return () => {};
    }, [])
  );

  return (
    <View>
      {items &&
        items.map((item, index) => (
          <View key={index} style={styles.favListContainer}>
            <TouchableOpacity>
              <View>
                <AuctionTypeTag
                  styles={{ tag: styles.auctionTypeTag }}
                  text={item.auctionType == "LIVE" ? "실시간" : "일반"}
                ></AuctionTypeTag>
              </View>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <View style={{ flex: 2 }}>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={{
                      width: ScreenHeight / 10,
                      height: ScreenHeight / 10,
                    }}
                  />
                </View>
                <View style={{ flex: 6, justifyContent: "space-between" }}>
                  <Text style={{ fontSize: 18 }} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <CompletedTag
                      styles={{ tag: styles.completedTypeTag }}
                      text={item.isSold == true ? "거래완료" : "진행중"}
                    />
                    <Text>참여자 : </Text>
                    <TextInput
                      editable={false}
                      maxLength={3}
                      value={item.biddingCount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      style={styles.textArea}
                      textAlign="center"
                    />
                  </View>
                </View>
                <View
                  style={{
                    // flex: 1,
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <TouchableOpacity onPress={() => pressHeart(item.itemSeq)}>
                    {heart === true ? (
                      <Ionicons name="heart" size={24} color="#EA759A" />
                    ) : (
                      <Ionicons name="heart-outline" size={24} color="black" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: ScreenWidth / 30,
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", flex: 1 }}>
                  <Text>시초가 : </Text>
                  <TextInput
                    editable={false}
                    maxLength={7}
                    value={item.startPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    style={styles.textArea}
                    textAlign="center"
                  />
                </View>
                <View style={{ flexDirection: "row", flex: 1, marginLeft: 19 }}>
                  <Text>{item.isSold == true ? "낙찰가 : " : "입찰가 : "}</Text>
                  <TextInput
                    editable={false}
                    maxLength={7}
                    value={item.lastPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    style={styles.textArea}
                    textAlign="center"
                  />
                </View>
              </View>
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

export default Favorite;

const styles = StyleSheet.create({
  favListContainer: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  textArea: {
    borderRadius: 20,
    borderWidth: 0.5,
    height: 24,
    width: ScreenWidth / 4,
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
