import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  LayoutAnimation,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import MoreButton from "../../Atoms/Buttons/moreButton";
import CountDown from "../../Atoms/Typographies/countDown";
import GeneralButton from "../../Atoms/Buttons/generalButton";
import NumberFormat from "react-number-format";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { biddingAuction } from "../../../apis/auctionApi";
import UpdateButton from "./updateButton";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { loadDataAsync } from "../../../store/modules/detail";
import { useDispatch } from "react-redux";
type Props = {};

const index = ({ item, descStyle, titleStyle }) => {
  const [showMore, setShowMore] = useState(false);
  const [showDivider, setShowDivier] = useState<boolean>(true);
  const [currentCost, setCurrentCost] = useState<string>("15000");
  const [bidRightNow, setBidRightNow] = useState<string>("15000");
  const [bidAssignValue, setBidAssignValue] = useState<string>("15000");
  const [biddingBuyer, setBiddingBuyer] = useState<any>({});
  const [userId, setUserId] = useState();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onLoadData = () => {
    dispatch(loadDataAsync(item.itemSeq));
  };
  useEffect(() => {
    if (item.bidding !== null) {
      setCurrentCost(item.bidding.biddingPrice);
      setBiddingBuyer(item.bidding.buyer);
    } else {
      setCurrentCost(item.startPrice);
    }

    AsyncStorageLib.getItem("accessToken", (err, res: any) => {
      const decodedToken: any = jwt_decode<JwtPayload>(res);

      setUserId(decodedToken.sub);
    });
  }, []);

  const bidding = async (text: string) => {
    const formData = new FormData();
    if (text === "immediately") {
      formData.append("biddingPrice", Number(bidRightNow));
    } else {
      formData.append("biddingPrice", Number(bidAssignValue));
    }
    const hammer: any = false;
    formData.append("isHammered", hammer);
    try {
      const response = await biddingAuction(item.itemSeq, formData);
    } catch {
      Alert.alert("입찰에 실패했습니다.");
    } finally {
      onLoadData();
    }
  };

  useEffect(() => {
    setBidRightNow(String((Number(currentCost) * 1.1).toFixed()));
    setBidAssignValue(String((Number(currentCost) * 1.1).toFixed()));
  }, [currentCost]);

  const handleMoreClick = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowMore(!showMore);
  };

  const onHandleChatOpen = () => {
    navigation.navigate("auctionChat", {
      id: item.itemSeq,
      item: item,
    });
  };

  const handleOnchangebidRightNow = (e: any) => {
    setBidRightNow(e.nativeEvent.text);
  };

  const handleOnchangebidAssignValue = (e: any) => {
    setBidAssignValue(e.nativeEvent.text);
  };

  const onTextLayout = useCallback((e) => {
    setShowDivier(e.nativeEvent.lines.length < 2);
  }, []);

  const handlebidRightNow = () => {
    Alert.alert(
      "지정가 입찰",
      `${bidAssignValue
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원에 입찰하시겠습니까?`,
      [
        {
          text: "아니오",
          style: "cancel",
        },
        {
          text: "예",
          onPress: () => bidding("immediately"),
        },
      ]
    );
  };

  const handlebidAssignValue = () => {
    if (Number(currentCost) * 1.1 - 0.5 <= Number(bidAssignValue)) {
      Alert.alert(
        "지정가 입찰",
        `${bidAssignValue
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원에 입찰하시겠습니까?`,
        [
          {
            text: "아니오",
            style: "cancel",
          },
          {
            text: "예",
            onPress: () => bidding("input"),
          },
        ]
      );
    } else {
      Alert.alert(
        "입찰 금액 오류",
        `최소 입찰 금액인 ${
          Number(currentCost) * 1.1
        }원부터 \n입찰할 수 있습니다.`,
        [
          {
            text: "닫기",
          },
        ]
      );
    }
  };
  return (
    <>
      {
        <View style={{ paddingBottom: Dimensions.get("window").height / 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.type}>
              {item.auctionType === "NORMAL" ? "일반 경매" : "실시간 경매"}
            </Text>
            {userId == item.seller.seq ? (
              <UpdateButton item={item} reqItem={item.itemSeq} />
            ) : (
              <View />
            )}
          </View>
          <Text style={titleStyle} numberOfLines={2}>
            {item.title}
          </Text>
          <View style={styles.badges}>
            <Text style={styles.typography}>{item.seller.nickname}</Text>
            <Text style={styles.typography}>
              최소 입찰가 :{" "}
              {item.biddingUnit
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              원
            </Text>
          </View>
          <View
            style={{
              ...styles.divider,
              ...styles.dividerContainer,
            }}
          />
          <Text
            style={descStyle}
            numberOfLines={showMore ? 100 : 2}
            onTextLayout={onTextLayout}
          >
            {item.content}
          </Text>
          {!showDivider ? (
            <MoreButton
              handleMoreClick={handleMoreClick}
              style={styles.dividerContainer}
              showMore={showMore}
            />
          ) : (
            <View
              style={{
                ...styles.divider,
                ...styles.dividerContainer,
              }}
            />
          )}
          <View style={styles.itemInformationContainer}>
            <Text style={styles.information}>종료까지 남은 시간 : </Text>
            <CountDown style={styles.information} endTime={item.endTime} />
          </View>
          <View style={styles.itemInformationContainer}>
            <Text style={styles.information}>현재 입찰가 : </Text>
            <TextInput
              editable={false}
              maxLength={15}
              value={currentCost
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              style={styles.textArea}
              textAlign="center"
            />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.bidding ? (
                <>
                  <Image
                    source={{ uri: item.bidding?.buyer.profileImageUrl }}
                    style={{
                      width: 20,
                      height: 20,
                      borderWidth: 1,
                      borderRadius: 9999,
                      borderColor: "#444",
                      marginRight: 5,
                    }}
                  />

                  <Text>{item.bidding?.buyer.nickname}</Text>
                </>
              ) : (
                <></>
              )}
            </View>
          </View>
          <View
            style={{
              ...styles.divider,
              ...styles.dividerContainer,
            }}
          />
          <View style={styles.itemInformationContainer}>
            <Text style={styles.information}>즉시 입찰가 : </Text>
            <TextInput
              editable={false}
              maxLength={15}
              value={""}
              style={styles.textArea}
              textAlign="center"
              keyboardType="numeric"
              onChange={handleOnchangebidRightNow}
            >
              <NumberFormat
                value={bidRightNow}
                thousandSeparator={true}
                displayType={"text"}
                renderText={(value: number, props: any) => <Text>{value}</Text>}
                onValueChange={(values) => {
                  const { formattedValue, value } = values;
                  setBidRightNow(value);
                }}
              />
            </TextInput>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 0.1 }} />
              <GeneralButton
                styles={{ box: styles.bidButton, text: styles.bidText }}
                text={"즉시입찰"}
                onPress={handlebidRightNow}
              >
                <AntDesign
                  name="upcircleo"
                  size={18}
                  color="white"
                  style={{ marginRight: 10 }}
                />
              </GeneralButton>
            </View>
          </View>
          <View style={styles.itemInformationContainer}>
            <Text style={styles.information}>지정 입찰가 : </Text>
            <TextInput
              editable={false}
              maxLength={15}
              value={""}
              style={styles.textArea}
              textAlign="center"
              editable={true}
              keyboardType="numeric"
              onChange={handleOnchangebidAssignValue}
            >
              <NumberFormat
                value={bidAssignValue}
                thousandSeparator={true}
                displayType={"text"}
                renderText={(value, props) => <Text>{value}</Text>}
                onValueChange={(values) => {
                  const { formattedValue, value } = values;
                  setBidAssignValue(value);
                }}
              />
            </TextInput>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 0.1 }} />
              <GeneralButton
                styles={{ box: styles.bidButton, text: styles.bidText }}
                text={"입찰하기"}
                onPress={handlebidAssignValue}
              >
                <AntDesign
                  name="upcircleo"
                  size={18}
                  color="white"
                  style={{ marginRight: 10 }}
                />
              </GeneralButton>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 1 }} />

            <GeneralButton
              styles={{ box: styles.startChatBox, text: styles.startChatText }}
              onPress={onHandleChatOpen}
              text="채팅방 참여"
            />
            <View style={{ flex: 1 }} />
          </View>
        </View>
      }
    </>
  );
};

export default index;

const styles = StyleSheet.create({
  type: {
    color: "red",
    fontSize: 15,
    marginLeft: Dimensions.get("window").height / 60,
    marginTop: Dimensions.get("window").height / 60,
    marginBottom: Dimensions.get("window").height / 200,
  },
  badges: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  typography: {
    marginTop: Dimensions.get("window").height / 100,
    marginLeft: Dimensions.get("window").height / 50,
    marginRight: Dimensions.get("window").height / 50,
  },
  divider: {
    borderBottomColor: "#aaaaaa",
    borderBottomWidth: 1,
    marginTop: Dimensions.get("window").height / 100,
    marginBottom: Dimensions.get("window").height / 100,
  },
  dividerContainer: {
    width: Dimensions.get("window").width * 0.95,
    alignSelf: "center",
  },
  information: {
    flex: 1,
    fontSize: 18,
  },
  itemInformationContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: Dimensions.get("window").height / 100,
  },
  textArea: {
    flex: 1.5,
    borderRadius: 20,
    borderWidth: 0.5,
    height: 30,
  },
  bidButton: {
    flex: 0.9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0176B7",
    height: 30,
    borderRadius: 20,
    borderWidth: 0.5,
  },
  bidText: {
    color: "white",
  },
  startChatBox: {
    flex: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0176B7",
    height: Dimensions.get("window").height / 20,
    marginTop: Dimensions.get("window").height / 50,
    borderRadius: 9999,
    borderWidth: 0.5,
  },
  startChatText: {
    color: "white",
    fontSize: 20,
  },
});
