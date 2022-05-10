import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import React from "react";

type Props = {};

const Slider = ({ data, handleClickItem }) => {
  const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");
  const { item } = data;
  return (
    <>
      {item && (
        <TouchableOpacity
          style={{
            height: Dimensions.get("window").height / 5,
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
              height: ScreenHeight / 5,
              width: ScreenHeight / 5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={{ uri: item.imageUrl }}
              style={{
                width: ScreenHeight / 7,
                height: ScreenHeight / 7,
                borderWidth: 1,
                borderRadius: 5,
              }}
              resizeMode="cover"
            />
          </View>
          <View style={{ justifyContent: "center", width: "50%" }}>
            <View>
              {item.itemCategories?.map((category: string, idx: number) => (
                <View
                  style={{
                    backgroundColor: "#F8A33E",
                    width: ScreenWidth / 4,
                    borderRadius: 9999,
                    paddingTop: 3,
                    paddingBottom: 3,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 3,
                  }}
                  key={idx}
                >
                  <Text>{category}</Text>
                </View>
              ))}
            </View>
            <Text numberOfLines={1} style={{ fontSize: 20 }}>
              {item.title}
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 5,
                justifyContent: "space-between",
                alignItems: "center",
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
                <Text style={{ marginLeft: 5 }}>{item.sellerNickname}</Text>
              </View>
              <Text>
                최소 입찰가 :{" "}
                {item.bidding
                  ? Number(item.bidding.biddingPrice / 10)
                  : Number(item.startPrice / 10)}
                원
              </Text>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: "#555",
                marginTop: 5,
                marginBottom: 10,
              }}
            />
            <View
              style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
            >
              <Text>
                현재 입찰가 :{" "}
                {item.bidding ? item.bidding.biddingPrice : item.startPrice}
                {"원"}
              </Text>
              <Text>
                {new Date(item.endTime).toLocaleDateString("ko-KR")}{" "}
                {new Date(item.endTime).toLocaleTimeString("ko-KR")}
                {" 종료"}
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
