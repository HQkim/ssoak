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
import { Ionicons } from "@expo/vector-icons";
import Border from "../../Atoms/Borders/border";
import MoreButton from "../../Atoms/Buttons/moreButton";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/modules";
// import { loadDataAsync } from "../../../store/modules/detail";
import {
  likeItem,
  cancelLikeItem,
  deleteAuction,
} from "../../../apis/auctionApi";
import jwt_decode, { JwtPayload } from "jwt-decode";

const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get("window");

const AuctionDescription = ({ item, reqItem }) => {
  console.warn(item);
  const [showMore, setShowMore] = useState(false);
  const [showDivider, setShowDivier] = useState<boolean>(true);
  const itemInformation = useSelector((state: RootState) => state.detail.item);
  const [biddingPrice, setBiddingPrice] = useState(0);
  // const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(item.isLike);
  const navigation = useNavigation();
  const [select, setSelect] = useState(false);
  const [token, setToken] = useState<any>();

  const date = new Date();
  let timeInfo = JSON.stringify(date);
  let temp = timeInfo.replace(".000Z", "");

  const getToken = async () => {
    const tokenSeq: string = await AsyncStorage.getItem("accessToken");
    const decodedToken = jwt_decode<JwtPayload>(tokenSeq);
    const myToken = Number(decodedToken.sub);
    setToken(myToken);
    console.warn(typeof item.seller.seq, typeof token);
  };

  const onSelect = () => {
    setSelect(!select);
  };

  // const onStartLoadData = (id: number) => {
  //   dispatch(loadDataAsync(id));
  // };

  const onUpdate = () => {
    navigation.navigate("itemModification", {
      params: item,
    });
  };

  const ondelete = async (itemSeq: number) => {
    const result = await deleteAuction(itemSeq);
    if (result.status === 204) {
      navigation.navigate("main");
    }
  };

  const onTextLayout = useCallback((e) => {
    setShowDivier(e.nativeEvent.lines.length < 2);
  }, []);

  const handleMoreClick = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowMore(!showMore);
  };

  const onClickHeart = async (reqItemNumber: number) => {
    setIsLiked(!isLiked);
    if (isLiked === true) {
      const result = await cancelLikeItem(reqItemNumber);
      console.warn(result);
    } else {
      const result = await likeItem(reqItemNumber);
      console.warn(result);
    }
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
    getToken();
    if (item.bidding) {
      setBiddingPrice(item.bidding.biddingPrice);
    }
  }, []);

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
              uri: item.seller.profileImageUrl,
            }}
            style={styles.imgContainer}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontWeight: "100", marginBottom: 2 }}>판매자</Text>
            <Text style={styles.typography}>{item.seller.nickname}</Text>
          </View>
        </View>
        {token === undefined ? null : item.seller.seq === token ? (
          <TouchableOpacity
            onPress={onSelect}
            style={{ marginHorizontal: ScreenWidth / 16 }}
          >
            <AntDesign
              name="ellipsis1"
              size={24}
              color="black"
              style={styles.dropdown}
            />
          </TouchableOpacity>
        ) : isLiked ? (
          <Ionicons
            name={"heart"}
            size={ScreenWidth / 9}
            color={"#EA759A"}
            onPress={() => onClickHeart(reqItem)}
          />
        ) : (
          <Ionicons
            name={"heart-outline"}
            size={ScreenWidth / 9}
            color={"#EA759A"}
            onPress={() => onClickHeart(reqItem)}
          />
        )}

        {select ? (
          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownStyle} onPress={onUpdate}>
              <Ionicons name="pencil" size={20} color="black" />
              수정하기
            </Text>
            <Text
              style={styles.dropdownStyle}
              onPress={() => ondelete(reqItem)}
            >
              <Ionicons name="trash-outline" size={20} color="black" />
              삭제하기
            </Text>
          </View>
        ) : null}
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
  dropdown: {
    position: "absolute",
    top: -10,
    right: -10,
  },
  dropdownContainer: {
    position: "absolute",
    right: 65,
    top: 5,
  },
  dropdownStyle: {
    backgroundColor: "#ffffffae",
    width: 100,
    height: 35,
    padding: 5,
    fontSize: 15,
    textAlign: "center",
  },
});
