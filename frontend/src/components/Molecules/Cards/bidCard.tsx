import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { biddingAuction } from "../../../apis/auctionApi";
import { RootState } from "../../../store/modules";

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");

const BidCard = ({
  item,
  title,
  button,
  edit,
  biddingUnit,
  reqItem,
  getItemDetail,
}) => {
  const isLoading = useSelector((state: RootState) => state.detail.isLoading);
  let biddingPrice = JSON.stringify(biddingUnit);
  const [value, setValue] = useState(biddingPrice);

  const inputValue = (number) => {
    setValue(number);
  };

  const bidding = async (text: string) => {
    const formData = new FormData();
    if (text === "immediately" && item.bidding != null) {
      const price = Number(value);
      const itemPrice: any = price + item.bidding.biddingPrice;
      formData.append("biddingPrice", itemPrice);
    } else if (text === "immediately" && item.bidding == null) {
      const price = Number(value);
      const itemPrice: any = price + item.startPrice;
      formData.append("biddingPrice", itemPrice);
    } else if (text === "input") {
      const price = Number(value);
      const itemPrice: any = price;
      formData.append("biddingPrice", itemPrice);
    }
    if (item.bidding.buyer.seq === item.member.seq) {
      Alert.alert("연속으로 입찰하실 수 없습니다.");
    } else if (text === "input" && item.bidding.biddingPrice >= value) {
      Alert.alert("현재 입찰가보다 적은 금액으로 입찰할 수 없습니다.");
    }
    const hammer: any = false;
    formData.append("isHammered", hammer);
    const result = await biddingAuction(reqItem, formData);
    if (result.statusCode === 201) {
      getItemDetail();
      Alert.alert("입찰에 성공하였습니다.");
    }
  };

  return (
    <View style={styles.CardContainer}>
      <Image
        source={{
          uri: item.member.profileImageUrl,
        }}
        style={styles.imgContainer}
      ></Image>
      <View style={{ alignItems: "center" }}>
        <TextInput
          editable={edit}
          maxLength={15}
          keyboardType="numeric"
          value={value}
          style={styles.textArea}
          textAlign="center"
          onChangeText={(text) => inputValue(text)}
        ></TextInput>
        <Text style={styles.textStyle}>{title}</Text>
      </View>
      {edit === false ? (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => bidding("immediately")}
        >
          <Text style={styles.textStyle2}>{button}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => bidding("input")}
        >
          <Text style={styles.textStyle2}>{button}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BidCard;

const styles = StyleSheet.create({
  CardContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#ffffff",
    width: ScreenWidth / 1.2,
    height: ScreenWidth / 4.2,
    marginBottom: 15,
    shadowColor: "rgb(50, 50, 50)",
    shadowOpacity: 0.8,
    elevation: 3,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  imgContainer: {
    width: ScreenWidth / 6,
    height: ScreenWidth / 6,
    borderRadius: 100,
  },
  textStyle: {
    color: "#989898",
    fontWeight: "200",
  },
  textArea: {
    borderRadius: 55,
    borderWidth: 0.7,
    width: ScreenWidth / 4,
    height: ScreenWidth / 13,
    marginBottom: 10,
    color: "#4A4C4E",
  },
  buttonContainer: {
    backgroundColor: "#0176B7",
    width: ScreenWidth / 5,
    height: ScreenWidth / 13,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle2: {
    color: "#ffffff",
    fontSize: ScreenWidth / 28,
  },
});
