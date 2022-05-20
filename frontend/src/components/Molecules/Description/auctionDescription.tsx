import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  LayoutAnimation,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import Border from "../../Atoms/Borders/border";
import MoreButton from "../../Atoms/Buttons/moreButton";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import UpdateButton from "./updateButton";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { reportUser } from "../../../apis/auth";

const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get("window");

const AuctionDescription = ({ item, reqItem }) => {
  const [showMore, setShowMore] = useState(false);
  const [userId, setUserId] = useState();
  const [showDivider, setShowDivier] = useState<boolean>(true);
  const [biddingPrice, setBiddingPrice] = useState(0);
  const navigation = useNavigation();
  const endTime = item.endTime.replace("T", " ");

  const onTextLayout = useCallback((e) => {
    setShowDivier(e.nativeEvent.lines.length < 2);
    // console.log(item)
  }, []);

  const handleMoreClick = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowMore(!showMore);
  };

  const onBid = () => {
    navigation.navigate("auction", {
      item: item,
      reqItem: reqItem,
    });
  };

  const onBidClose = () => {
    Alert.alert("입찰이 종료되었습니다.");
  };

  useEffect(() => {
    if (item.bidding) {
      setBiddingPrice(item.bidding.biddingPrice);
    }
    AsyncStorageLib.getItem("accessToken", (err, res: any) => {
      const decodedToken: any = jwt_decode<JwtPayload>(res);
      setUserId(decodedToken.sub);
    });
  }, []);

  const handleReportClick = () => {
    Alert.alert(
      "신고",
      `판매 내용을 신고하시겠습니까?\n신고 후에는 대상자의 경매품을 볼 수 없습니다.`,
      [
        {
          text: "예",
          onPress: () => {
            reportUser(item.seller?.seq)
              .then((res) => {
                Alert.alert(
                  "신고",
                  "접수가 완료되었습니다.\n더 이상 신고 대상자의 경매품을\n확인할 수 없습니다."
                );
              })
              .catch(() => {
                Alert.alert("신고", "신고 접수에 실패했습니다.");
              });
          },
        },
        {
          text: "아니오",
          style: "cancel",
        },
      ]
    );
  };

  return (
    <View>
      <View style={styles.box}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={{
              uri: item?.seller?.profileImageUrl,
            }}
            style={styles.imgContainer}
          />
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            <Text style={{ fontWeight: "100", marginBottom: 2 }}>판매자</Text>
            <Text style={styles.typography}>{item?.seller?.nickname}</Text>
          </View>
          {userId == item.seller?.seq ? null : (
            <TouchableOpacity onPress={handleReportClick}>
              <AntDesign
                name="exclamationcircle"
                size={Dimensions.get("window").width / 18}
                style={{ justifyContent: "center" }}
              />
            </TouchableOpacity>
          )}
        </View>
        <UpdateButton item={item} reqItem={reqItem} />
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.category}>
          <Text style={{ color: "#ffffff" }}>{item.itemCategoryName}</Text>
        </View>
      </View>
      <Border style={styles.border} />
      <View style={styles.box}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AntDesign
            name={"creditcard"}
            size={ScreenWidth / 18}
            style={{ marginRight: 5 }}
          />
          <Text style={styles.title}>시초가</Text>
        </View>

        <Text style={styles.title}>
          {item.startPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
        </Text>
      </View>
      <View style={styles.box}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AntDesign
            name={"creditcard"}
            size={ScreenWidth / 18}
            style={{ marginRight: 5 }}
          />
          <Text style={styles.title}>현재 입찰가</Text>
        </View>
        <Text style={styles.title}>
          {biddingPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
        </Text>
      </View>
      <View style={styles.box}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="ios-time-outline"
            color="black"
            size={ScreenWidth / 18}
            style={{ marginRight: 5 }}
          />
          <Text style={styles.title}>경매 종료 시간</Text>
        </View>
        <Text style={styles.title}>{endTime}</Text>
      </View>
      <Text
        style={styles.description}
        numberOfLines={showMore ? 100 : 4}
        onTextLayout={onTextLayout}
      >
        {item.content}
      </Text>
      {!showDivider && (
        <MoreButton
          handleMoreClick={handleMoreClick}
          style={styles.dividerContainer}
          showMore={showMore}
        />
      )}
      <View style={{ alignItems: "center", padding: ScreenHeight / 50 }}>
        {item.isSold === true ? (
          <TouchableOpacity style={styles.buttonContainer} onPress={onBidClose}>
            <Text style={styles.textContainer}>입찰종료</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.buttonContainer} onPress={onBid}>
            <Text style={styles.textContainer}>입찰하기</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AuctionDescription;

const styles = StyleSheet.create({
  description: {
    fontSize: ScreenWidth / 23,
    fontWeight: "200",
    marginTop: 25,
    marginLeft: ScreenWidth / 20,
    marginRight: ScreenWidth / 20,
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: ScreenWidth / 30,
    paddingLeft: ScreenWidth / 20,
    paddingRight: ScreenWidth / 20,
  },
  dividerContainer: {
    width: ScreenWidth / 1.1,
    alignSelf: "center",
  },
  title: {
    fontSize: ScreenWidth / 21,
    fontWeight: "300",
  },
  typography: {
    fontSize: ScreenWidth / 25,
    fontWeight: "300",
  },
  category: {
    width: ScreenWidth / 3.5,
    height: ScreenHeight / 20,
    backgroundColor: "#F8A33E",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  imgContainer: {
    width: ScreenWidth / 7,
    height: ScreenWidth / 7,
    borderRadius: 100,
  },
  border: {
    marginTop: ScreenWidth / 30,
    marginBottom: ScreenWidth / 50,
    borderBottomWidth: 1,
    width: ScreenWidth / 1.1,
    alignSelf: "center",
    borderColor: "#d7d4d4",
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
