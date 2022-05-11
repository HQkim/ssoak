import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import AuctionBid from "../Molecules/Description/auctionBid";
import CountDown from "../Atoms/Typographies/countDown";
import jwt_decode, { JwtPayload } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { hammerAuction } from "../../apis/auctionApi";

const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get("window");

const Action = ({ item, reqItem, getItemDetail }) => {
  console.warn(reqItem);
  console.warn(item.bidding === null);
  const [token, setToken] = useState<any>();

  const getToken = async () => {
    const tokenSeq: string = await AsyncStorage.getItem("accessToken");
    const decodedToken = jwt_decode<JwtPayload>(tokenSeq);
    const myToken = Number(decodedToken.sub);
    setToken(myToken);
  };

  const onHammerd = async () => {
    if (item.bidding === null) {
      Alert.alert("입찰 정보가 없습니다.");
    } else {
      const formData = new FormData();
      const price = Number(item.bidding.biddingPrice);
      const itemPrice: any = price;
      formData.append("biddingPrice", itemPrice);
      const hammer: any = true;
      formData.append("isHammered", hammer);
      const result = await hammerAuction(reqItem, formData);
      console.warn(result);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <View>
      <Text style={styles.timeStyle}>
        경매 종료 시간 :{" "}
        <CountDown style={styles.timeStyle} endTime={item.endTime} />
      </Text>

      {token === item.seller.seq ? (
        <View>
          <Text style={styles.titleStyle}>물품 낙찰하기</Text>
          <Text style={styles.descriptionStyle}>
            낙찰 시 해당 물품의 경매가 종료됩니다.
          </Text>
          <View style={{ padding: 20 }}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={onHammerd}
            >
              <Text style={styles.textContainer}>낙찰하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <Text style={styles.titleStyle}>입찰 참여하기</Text>
          <Text style={styles.descriptionStyle}>
            입찰 참여 시 취소할 수 없습니다. 확인 후 입찰해주세요.
          </Text>
          <AuctionBid
            item={item}
            reqItem={reqItem}
            getItemDetail={getItemDetail}
          />
        </View>
      )}
    </View>
  );
};

export default Action;

const styles = StyleSheet.create({
  timeStyle: {
    fontSize: ScreenWidth / 20,
    fontWeight: "200",
    textAlign: "center",
    marginTop: ScreenHeight / 6,
  },
  titleStyle: {
    fontSize: ScreenWidth / 20,
    fontWeight: "200",
    marginTop: ScreenHeight / 30,
    marginBottom: 2,
    paddingLeft: 20,
    paddingRight: 20,
  },
  descriptionStyle: {
    fontSize: ScreenWidth / 24,
    fontWeight: "100",
    color: "#747474",
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonContainer: {
    backgroundColor: "#0176B7",
    width: "100%",
    borderRadius: 5,
    height: ScreenHeight / 17,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    color: "#ffffff",
    fontWeight: "200",
    fontSize: ScreenHeight / 40,
  },
});
