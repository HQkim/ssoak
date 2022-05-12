import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Countdown, { zeroPad } from "react-countdown";
type Props = {};

const Slider: any = ({ data, handleClickItem }) => {
  const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");
  const { item } = data;

  return (
    <>
      {item && (
        <TouchableOpacity
          style={{
            height: Dimensions.get("window").height / 6,
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#eeeeee",
            marginTop: 5,
            marginBottom: 5,
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
                width: ScreenHeight / 8,
                height: ScreenHeight / 8,
                borderWidth: 1,
                borderRadius: 5,
              }}
              resizeMode="cover"
            />
          </View>
          <View style={{ justifyContent: "center", flex: 2 }}>
            <View style={{ flex: 2, flexDirection: "column" }}>
              <View style={{ flex: 3, flexDirection: "row" }}>
                <View style={{ flex: 2 }}>
                  <View
                    style={{
                      justifyContent: "center",
                      marginBottom: 3,
                      flex: 2,
                    }}
                  >
                    <View
                      style={{
                        paddingTop: 3,
                        paddingBottom: 3,
                        flex: 1,
                        justifyContent: "center",
                      }}
                    >
                      <View style={{ flex: 1 }} />
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: "#F8A33E",
                          width: ScreenWidth / 4,
                          height: ScreenWidth / 20,
                          borderRadius: 9999,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{}}>{item.category}</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        marginTop: 3,
                        marginLeft: 3,
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        numberOfLines={1}
                        style={{ fontSize: ScreenWidth / 20 }}
                      >
                        {item.title}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "flex-end",
                      marginRight: 15,
                    }}
                  >
                    <Ionicons
                      name={"heart"}
                      size={ScreenWidth / 15}
                      color={"#EA759A"}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 10,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        source={{ uri: item.sellerprofile }}
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 9999,
                        }}
                      />
                      <Text style={{ marginLeft: 5 }}>
                        {item.sellerNickname}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5,
                    flex: 1,
                    marginLeft: 5,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text>
                    현재 입찰가 :{" "}
                    {item.bidding
                      ? item.bidding.biddingPrice
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : item.startPrice
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    {"원"}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{}} />

            <View
              style={{
                justifyContent: "flex-end",
                alignItems: "flex-end",
                marginRight: 10,
              }}
            >
              <Text>
                최소 입찰호가 :{" "}
                {item.bidding
                  ? Number(item.bidding.biddingPrice / 10)
                      .toFixed()
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : Number(item.startPrice / 10)
                      .toFixed()
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                원
              </Text>
              <Text>
                <Countdown
                  date={item.endTime}
                  intervalDelay={0}
                  precision={0}
                  // daysInHours={true}
                  renderer={({ days, hours, minutes, seconds }) => (
                    <Text
                      style={{
                        flex: 1,
                      }}
                    >
                      {Number(zeroPad(hours)) + Number(zeroPad(days)) * 24}시간{" "}
                      {zeroPad(minutes)}분 {zeroPad(seconds)}초
                    </Text>
                  )}
                />
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default Slider;

const styles = StyleSheet.create({});
