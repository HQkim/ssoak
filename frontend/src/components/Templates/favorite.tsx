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
import AuctionTypeTag from "../Atoms/Tags/auctionTypeTag";
import CompletedTag from "../Atoms/Tags/completedTag";
import { getFavoriteItems } from "../../apis/ItemApi";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { likeItem } from "../../apis/auctionApi";
import { cancelLikeItem } from "../../apis/auctionApi";
import { ScrollView } from "react-native-gesture-handler";
import Likes from "../Molecules/Buttons/likes";

type Props = {
  navigation: any;
  route: object;
};

type Items = {
  items: Array<object>;
};

const { height: ScreenHeight } = Dimensions.get("window");
const { width: ScreenWidth } = Dimensions.get("window");

const Favorite = (props: Props) => {
  const [heart, setHeart] = useState(true);
  const [items, setItems] = useState<Items | null | any>([]);
  const navigation: any = useNavigation();
  const getData = async () => {
    const response = await getFavoriteItems();
    setItems(response);
  };
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

  const pressHeart = async (item) => {
    if (item.isLiked == true) {
      await cancelLikeItem(item.itemSeq);
      item.isLiked = false;
      setHeart(false);
    } else {
      await likeItem(item.itemSeq);
      item.isLiked = true;
      setHeart(true);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
      return () => {};
    }, [])
  );

  return (
    <ScrollView>
      {items.length < 1 ? (
        <View
          style={{
            marginTop: ScreenHeight * 0.4,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20 }}>찜한 물품이 없습니다.</Text>
        </View>
      ) : (
        <>
          {items &&
            items.map((item, index) => (
              <View key={index} style={styles.favListContainer}>
                <TouchableOpacity onPress={() => goDetail(item)}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <AuctionTypeTag
                        styles={{ tag: styles.auctionTypeTag }}
                        text={item.auctionType == "LIVE" ? "실시간" : "일반"}
                      ></AuctionTypeTag>
                      <CompletedTag
                        styles={{ tag: styles.completedTypeTag }}
                        text={item.isSold == true ? "거래완료" : "진행중"}
                      />
                    </View>
                    <Likes item={item} />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: ScreenWidth / 50,
                    }}
                  >
                    <Image
                      source={{ uri: item.imageUrl }}
                      style={{
                        width: ScreenWidth / 3.2,
                        height: ScreenWidth / 3.2,
                        borderColor: "#d7d4d4",
                        borderWidth: 1,
                      }}
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
                          <TextInput
                            editable={false}
                            maxLength={7}
                            value={
                              item.startPrice
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 원"
                            }
                            style={styles.textArea}
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
                          <TextInput
                            editable={false}
                            maxLength={7}
                            value={
                              item.lastPrice
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 원"
                            }
                            style={styles.textArea}
                            textAlign="center"
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      borderBottomColor: "#d7d4d4",
                      borderBottomWidth: 1,
                      marginTop: 15,
                    }}
                  />
                </TouchableOpacity>
              </View>
            ))}
        </>
      )}
    </ScrollView>
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
    width: ScreenWidth / 3,
  },
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
