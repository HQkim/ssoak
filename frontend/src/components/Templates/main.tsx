import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  View,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

// import { showLoaderAsync } from "../../store/modules/mainLoader";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/modules";
import SearchButton from "../Atoms/Buttons/searchButton";
import BellIcon from "../Atoms/Buttons/bellIcon";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import ItemInforms from "../Molecules/ItemInfo/itemInforms";
import { useNavigation } from "@react-navigation/native";

type Props = {
  onRefresh: () => any | undefined;
  navigation: any;
};
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get("window");

const items = [
  {
    id: 56,
    title: "물건을 판매합니다.",
    content: "물건을 판다구요 판다요 판다가 판다판다 판다판다",
    startPrice: 2222,
    biddingUnit: 222,
    startTime: "2022-05-06T10:09:00",
    endTime: "2022-05-06T10:39:00",
    auctionType: "NORMAL",
    isSold: false,
    isLike: false,
    likeCount: 0,
    itemCategories: ["도서/음반/티켓"],
    itemImages: [
      "https://ssoak-bucket.s3.ap-northeast-2.amazonaws.com/c96c7a46-ad54-4829-956c-6f29d777c923.jpg",
      "https://ssoak-bucket.s3.ap-northeast-2.amazonaws.com/d63a6dc4-6d19-4602-aedf-f0ce5b535ba6.jpg",
    ],
    member: {
      seq: 3,
      nickname: "민수 강",
      profileImageUrl:
        "http://k.kakaocdn.net/dn/ccuvej/btrASuLnbQE/eMkxhPyo0gm62D9QktiKoK/img_640x640.jpg",
    },
    bidding: null,
    seller: {
      seq: 3,
      nickname: "민수 강",
      profileImageUrl:
        "http://k.kakaocdn.net/dn/ccuvej/btrASuLnbQE/eMkxhPyo0gm62D9QktiKoK/img_640x640.jpg",
    },
  },
  {
    id: 60,
    title: "꽃 팝니다",
    content: "꽃 팔아요",
    startPrice: 10000,
    biddingUnit: 1000,
    startTime: "2022-05-28T19:10:00",
    endTime: "2022-05-28T19:40:00",
    auctionType: "LIVE",
    isSold: false,
    isLike: false,
    likeCount: 0,
    itemCategories: ["디지털기기"],
    itemImages: [
      "https://ssoak-bucket.s3.ap-northeast-2.amazonaws.com/387f454b-0ab2-479e-bceb-d087bad34f95.jpg",
    ],
    member: {
      seq: 3,
      nickname: "민수 강",
      profileImageUrl:
        "http://k.kakaocdn.net/dn/ccuvej/btrASuLnbQE/eMkxhPyo0gm62D9QktiKoK/img_640x640.jpg",
    },
    bidding: null,
    seller: {
      seq: 3,
      nickname: "민수 강",
      profileImageUrl:
        "http://k.kakaocdn.net/dn/ccuvej/btrASuLnbQE/eMkxhPyo0gm62D9QktiKoK/img_640x640.jpg",
    },
  },
  {
    id: 56,
    title: "물건을 판매합니다.",
    content: "물건을 판다구요 판다요 판다가 판다판다 판다판다",
    startPrice: 2222,
    biddingUnit: 222,
    startTime: "2022-05-06T10:09:00",
    endTime: "2022-05-06T10:39:00",
    auctionType: "NORMAL",
    isSold: false,
    isLike: false,
    likeCount: 0,
    itemCategories: ["도서/음반/티켓"],
    itemImages: [
      "https://ssoak-bucket.s3.ap-northeast-2.amazonaws.com/c96c7a46-ad54-4829-956c-6f29d777c923.jpg",
      "https://ssoak-bucket.s3.ap-northeast-2.amazonaws.com/d63a6dc4-6d19-4602-aedf-f0ce5b535ba6.jpg",
    ],
    member: {
      seq: 3,
      nickname: "민수 강",
      profileImageUrl:
        "http://k.kakaocdn.net/dn/ccuvej/btrASuLnbQE/eMkxhPyo0gm62D9QktiKoK/img_640x640.jpg",
    },
    bidding: null,
    seller: {
      seq: 3,
      nickname: "민수 강",
      profileImageUrl:
        "http://k.kakaocdn.net/dn/ccuvej/btrASuLnbQE/eMkxhPyo0gm62D9QktiKoK/img_640x640.jpg",
    },
  },
  {
    id: 60,
    title: "꽃 팝니다",
    content: "꽃 팔아요",
    startPrice: 10000,
    biddingUnit: 1000,
    startTime: "2022-05-28T19:10:00",
    endTime: "2022-05-28T19:40:00",
    auctionType: "LIVE",
    isSold: false,
    isLike: false,
    likeCount: 0,
    itemCategories: ["디지털기기"],
    itemImages: [
      "https://ssoak-bucket.s3.ap-northeast-2.amazonaws.com/387f454b-0ab2-479e-bceb-d087bad34f95.jpg",
    ],
    member: {
      seq: 3,
      nickname: "민수 강",
      profileImageUrl:
        "http://k.kakaocdn.net/dn/ccuvej/btrASuLnbQE/eMkxhPyo0gm62D9QktiKoK/img_640x640.jpg",
    },
    bidding: null,
    seller: {
      seq: 3,
      nickname: "민수 강",
      profileImageUrl:
        "http://k.kakaocdn.net/dn/ccuvej/btrASuLnbQE/eMkxhPyo0gm62D9QktiKoK/img_640x640.jpg",
    },
  },
  {
    id: 56,
    title: "물건을 판매합니다.",
    content: "물건을 판다구요 판다요 판다가 판다판다 판다판다",
    startPrice: 2222,
    biddingUnit: 222,
    startTime: "2022-05-06T10:09:00",
    endTime: "2022-05-06T10:39:00",
    auctionType: "NORMAL",
    isSold: false,
    isLike: false,
    likeCount: 0,
    itemCategories: ["도서/음반/티켓"],
    itemImages: [
      "https://ssoak-bucket.s3.ap-northeast-2.amazonaws.com/c96c7a46-ad54-4829-956c-6f29d777c923.jpg",
      "https://ssoak-bucket.s3.ap-northeast-2.amazonaws.com/d63a6dc4-6d19-4602-aedf-f0ce5b535ba6.jpg",
    ],
    member: {
      seq: 3,
      nickname: "민수 강",
      profileImageUrl:
        "http://k.kakaocdn.net/dn/ccuvej/btrASuLnbQE/eMkxhPyo0gm62D9QktiKoK/img_640x640.jpg",
    },
    bidding: null,
    seller: {
      seq: 3,
      nickname: "민수 강",
      profileImageUrl:
        "http://k.kakaocdn.net/dn/ccuvej/btrASuLnbQE/eMkxhPyo0gm62D9QktiKoK/img_640x640.jpg",
    },
  },
  {
    id: 60,
    title: "꽃 팝니다",
    content: "꽃 팔아요",
    startPrice: 10000,
    biddingUnit: 1000,
    startTime: "2022-05-28T19:10:00",
    endTime: "2022-05-28T19:40:00",
    auctionType: "LIVE",
    isSold: false,
    isLike: false,
    likeCount: 0,
    itemCategories: ["디지털기기"],
    itemImages: [
      "https://ssoak-bucket.s3.ap-northeast-2.amazonaws.com/387f454b-0ab2-479e-bceb-d087bad34f95.jpg",
    ],
    member: {
      seq: 3,
      nickname: "민수 강",
      profileImageUrl:
        "http://k.kakaocdn.net/dn/ccuvej/btrASuLnbQE/eMkxhPyo0gm62D9QktiKoK/img_640x640.jpg",
    },
    bidding: null,
    seller: {
      seq: 3,
      nickname: "민수 강",
      profileImageUrl:
        "http://k.kakaocdn.net/dn/ccuvej/btrASuLnbQE/eMkxhPyo0gm62D9QktiKoK/img_640x640.jpg",
    },
  },
];

const Main = (props: Props) => {
  const [liveItems, setLiveItems] = useState<any>([]);
  const [normalItems, setNormalItems] = useState<any>([]);
  const navigation = useNavigation();
  const handleClickItem = (item: any) => {
    if (item.auctionType === "NORMAL") {
      navigation.navigate("auctionDetail", {
        id: item.id,
      });
    } else {
      navigation.navigate("detail", {
        id: item.id,
      });
    }
  };
  const Slider = ({ items }) => {
    return (
      <>
        {items.map((item: any, idx: number) => (
          <TouchableOpacity
            key={idx}
            style={{
              height: Dimensions.get("window").height / 5,
              flexDirection: "row",
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
                source={{ uri: item.itemImages[0] }}
                style={{
                  width: ScreenHeight / 7,
                  height: ScreenHeight / 7,
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                resizeMode="contain"
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
                    source={{ uri: item.seller.profileImageUrl }}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 9999,
                    }}
                  />
                  <Text style={{ marginLeft: 5 }}>{item.seller.nickname}</Text>
                </View>
                <Text>최소 입찰가 : {item.biddingUnit}</Text>
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
        ))}
      </>
    );
  };

  const normalRoute = () => (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={props.onRefresh} />
      }
    >
      <Slider items={normalItems} />
    </ScrollView>
  );
  const liveRoute = () => (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={props.onRefresh} />
      }
    >
      <Slider items={liveItems} />
    </ScrollView>
  );

  const renderScene = SceneMap({
    NORMAL: normalRoute,
    LIVE: liveRoute,
  });
  const { isLoading } = useSelector((state: RootState) => state.mainLoader);
  const dispatch = useDispatch();
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "NORMAL", title: "일반 경매" },
    { key: "LIVE", title: "실시간 경매" },
  ]);

  useEffect(() => {
    const liveItems = items.filter((item) => item.auctionType === "NORMAL");
    const normalItems = items.filter((item) => item.auctionType === "LIVE");
    setLiveItems(liveItems);
    setNormalItems(normalItems);
  }, []);

  useEffect(() => {
    const liveItems = items.filter((item) => item.auctionType === "NORMAL");
    const normalItems = items.filter((item) => item.auctionType === "LIVE");
    setLiveItems(liveItems);
    setNormalItems(normalItems);
  }, [items]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <Text style={styles.main}>쏙</Text>
      </View>
      <View style={styles.scrollView}>
        <TabView
          renderTabBar={(props) => (
            <TabBar
              {...props}
              style={{ backgroundColor: "transparent" }}
              contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
              }}
              indicatorStyle={{
                backgroundColor: "#719dd7",
                width: Dimensions.get("window").width / 4,
                alignSelf: "center",
              }}
              indicatorContainerStyle={{
                marginHorizontal: Dimensions.get("window").width / 8,
              }}
              labelStyle={{ color: "black" }}
            />
          )}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  main: {
    fontSize: Dimensions.get("window").width / 15,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 10,
  },
});
