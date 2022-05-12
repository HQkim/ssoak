import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import AuctionTypeTag from "../Atoms/Tags/auctionTypeTag";
import CompletedTag from "../Atoms/Tags/completedTag";
import { ScrollView } from "react-native-gesture-handler";
import { getOnSaleItems } from "../../apis/ItemApi";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

type Props = {
  navigation: any;
  route: object;
};

type Items = {
  items: Array<object>;
};

const { height: ScreenHeight } = Dimensions.get("window");
const { width: ScreenWidth } = Dimensions.get("window");

const onSale = (props: Props) => {
  const [items, setItems] = useState<Items | null | any>([]);
  const [currentTime, setCurrentTime] = useState<any | undefined | object>(
    new Date()
  );
  const navigation: any = useNavigation();
  const getData = async () => {
    const response = await getOnSaleItems();
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
      // const time = new Date();
      // console.log(time);
      // setCurrentTime(time)
      return () => {};
    }, [])
  );

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      {items &&
        items.map((item, index) => (
          <View key={index} style={styles.onSaleContainer}>
            <TouchableOpacity onPress={() => goDetail(item)}>
              <AuctionTypeTag
                styles={{ tag: styles.auctionTypeTag }}
                text={item.auctionType == "LIVE" ? "실시간" : "일반"}
              ></AuctionTypeTag>
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
                <View style={{ flex: 6, justifyContent: "space-between" }}>
                  <Text style={{ fontSize: 18 }} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <View>
                    <View style={{ flexDirection: "row" }}>
                      <CompletedTag
                        styles={{ tag: styles.completedTypeTag }}
                        text={
                          currentTime < new Date(item.startTime)
                            ? "예약중"
                            : "진행중"
                        }
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
                </View>
              </View>
              <View
                style={{ flexDirection: "row", marginTop: ScreenWidth / 30 }}
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
                  <Text>입찰가 : </Text>
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
              <View>
                <View
                  style={{ flexDirection: "row", marginTop: ScreenWidth / 30 }}
                >
                  <Text>경매일 : </Text>
                  <TextInput
                    editable={false}
                    maxLength={50}
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
                    style={styles.textAreaDate}
                    textAlign="left"
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

export default onSale;

const styles = StyleSheet.create({
  onSaleContainer: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  auctionTypeTag: {
    width: ScreenWidth / 6,
    height: ScreenHeight / 33,
    backgroundColor: "#F8A33E",
    borderRadius: ScreenWidth / 12,
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
    backgroundColor: "#C4C4C4",
    borderRadius: ScreenWidth / 12,
    marginRight: ScreenWidth / 12,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
});
