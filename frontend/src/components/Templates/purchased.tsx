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
import { getPurchasedItems } from "../../apis/ItemApi";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

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

const Purchased = (props: Props) => {
  const [items, setItems] = useState<Items | null | any>([]);
  const navigation: any = useNavigation();
  const getData = async () => {
    const response = await getPurchasedItems();
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

  useFocusEffect(
    React.useCallback(() => {
      getData();
      return () => {};
    }, [])
  );

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      {items &&
        items.map((item, index) => (
          <View key={index} style={styles.purchasedContainer}>
            <TouchableOpacity onPress={() => goDetail(item)}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <AuctionTypeTag
                  styles={{ tag: styles.auctionTypeTag }}
                  text={item.auctionType == "LIVE" ? "실시간" : "일반"}
                ></AuctionTypeTag>
                <CompletedTag
                  styles={{ tag: styles.completedTypeTag }}
                  text={"거래완료"}
                />
              </View>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <View style={{ flex: 2 }}>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={{
                      width: ScreenHeight / 10,
                      height: ScreenHeight / 10,
                      borderColor: "#d7d4d4",
                      borderWidth: 1,
                    }}
                  />
                </View>
                <View style={{ justifyContent: "space-between" }}>
                  <Text style={{ fontSize: 18 }} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <Text>참여자 : </Text>
                    <TextInput
                      editable={false}
                      maxLength={5}
                      value={
                        item.biddingCount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 명"
                      }
                      style={styles.textArea}
                      textAlign="center"
                    />
                  </View>
                </View>
              </View>
              <View
                style={{ flexDirection: "row", marginTop: ScreenWidth / 30 }}
              >
                <View style={{ flexDirection: "row", flex: 1 }}>
                  <Text>시초가 : </Text>
                  <TextInput
                    editable={false}
                    maxLength={10}
                    value={
                      item.startPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 원"
                    }
                    style={styles.textArea}
                    textAlign="center"
                  />
                </View>
                <View style={{ flexDirection: "row", flex: 1, marginLeft: 19 }}>
                  <Text>낙찰가 : </Text>
                  <TextInput
                    editable={false}
                    maxLength={10}
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
    </ScrollView>
  );
};

export default Purchased;

const styles = StyleSheet.create({
  purchasedContainer: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
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
  textArea: {
    borderRadius: 20,
    borderWidth: 0.5,
    height: 24,
    width: ScreenWidth / 4,
  },
});
