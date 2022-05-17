import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Countdown, { zeroPad } from "react-countdown";
type Props = {};

const Slider: any = ({ data, handleClickItem }) => {
  const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");
  const { item } = data;
  const [dateTime, setDateTime] = useState();
  useEffect(() => {
    if (Platform.OS === "android") {
      setDateTime(new Date().setHours(new Date().getHours() + 9));
    } else {
      setDateTime(new Date());
    }
  }, []);
  useEffect(() => {
    console.log(dateTime, new Date(item.endTime), data.item.title);
  }, [dateTime]);
  // console.log(item);

  return (
    <>
      {item && (
        <TouchableOpacity
          style={{
            height: Dimensions.get("window").height / 5.5,
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#eeeeee",
            marginTop: 10,
            marginBottom: 10,
            borderRadius: 10,
            shadowOffset: {
              width: 2,
              height: 2,
            },
          }}
          onPress={() => handleClickItem(item)}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={{ uri: item.imageUrl }}
              style={{
                width: ScreenHeight / 6.5,
                height: ScreenHeight / 6.5,
                borderWidth: 1,
                borderRadius: 5,
              }}
              resizeMode="cover"
            />
          </View>
          <View style={{ justifyContent: "center", flex: 1.5, padding: 5 }}>
            <View style={{ flex: 2, flexDirection: "column" }}>
              <View style={{ flex: 3, flexDirection: "row" }}>
                <View>
                  <View
                    style={{
                      justifyContent: "center",
                      marginBottom: 3,
                      flex: 1,
                    }}
                  >
                    <View
                      style={{
                        paddingBottom: 3,
                        justifyContent: "center",
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "#F8A33E",
                          width: ScreenWidth / 4,
                          height: ScreenWidth / 16,
                          borderRadius: 9999,
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: 10,
                          marginTop: 5,
                        }}
                      >
                        <Text style={{ color: "#ffffff" }}>
                          {item.category}
                        </Text>
                      </View>
                      <View
                        style={{
                          backgroundColor: "#0176b7",
                          width: ScreenWidth / 5,
                          height: ScreenWidth / 16,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 9999,
                          marginTop: 5,
                        }}
                      >
                        <Text style={{ color: "white" }}>
                          {dateTime && dateTime > new Date(item.endTime)
                            ? "경매종료"
                            : dateTime && dateTime < new Date(item.startDate)
                            ? "경매예정"
                            : "경매중"}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 3,
                        marginTop: 3,
                        justifyContent: "center",
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          flex: 2,
                          marginTop: 3,
                          justifyContent: "center",
                        }}
                      >
                        <Text numberOfLines={1} style={{ fontSize: 20 }}>
                          {item.title}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          flex: 1,
                          marginLeft: 20,
                        }}
                      >
                        <Image
                          source={{ uri: item.sellerprofile }}
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 9999,
                            borderWidth: 1,
                            borderColor: "#444",
                          }}
                        />
                        <Text style={{ marginLeft: 5, marginRight: 5 }}>
                          {item.sellerNickname}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>
                    현재 입찰가 :{" "}
                    {item.biddingPrice
                      ? item.biddingPrice
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : item.startPrice
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    {"원"}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  // justifyContent: "space-around",
                  // alignItems: "center",
                  marginRight: 10,
                  flex: 1,
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    // flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text>
                    최소 입찰호가 :{" "}
                    {item.biddingPrice
                      ? Number(item.biddingPrice * 0.03)
                          .toFixed()
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : Number(item.startPrice * 0.03)
                          .toFixed()
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    원
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default Slider;

const styles = StyleSheet.create({});
