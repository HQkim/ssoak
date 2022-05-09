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
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
  onScrollLive: () => any;
  onScrollNormal: () => any;
};
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get("window");

const Main = (props: Props) => {
  const data = useSelector((state: RootState) => state.mainLoader.data);
  const [liveItems, setLiveItems] = useState<any>([]);
  const [normalItems, setNormalItems] = useState<any>([]);
  const navigation = useNavigation();
  const handleClickItem = (item: any) => {
    if (item.auctionType === "NORMAL") {
      navigation.navigate("auctionDetail", {
        id: item.itemSeq,
      });
    } else {
      navigation.navigate("detail", {
        id: item.itemSeq,
      });
    }
  };

  useEffect(() => {
    console.log(liveItems);
  }, [liveItems]);
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
                source={{ uri: item.imageUrl }}
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
                    source={{ uri: item.sellerprofile }}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 9999,
                    }}
                  />
                  <Text style={{ marginLeft: 5 }}>{item.sellerNickname}</Text>
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
      onScroll={(e: any) => {
        let paddingToBottom = 1;
        paddingToBottom += e.nativeEvent.layoutMeasurement.height;

        if (
          e.nativeEvent.contentOffset.y + paddingToBottom >=
          e.nativeEvent.contentSize.height
        ) {
          props.onScrollNormal();
        }
      }}
      scrollEventThrottle={0}
    >
      <Slider items={normalItems} />
    </ScrollView>
  );
  const liveRoute = () => (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={props.onRefresh} />
      }
      onScroll={(e) => {
        let paddingToBottom = 1;
        paddingToBottom += e.nativeEvent.layoutMeasurement.height;

        if (
          e.nativeEvent.contentOffset.y + paddingToBottom >=
          e.nativeEvent.contentSize.height
        ) {
          props.onScrollLive();
        }
      }}
      scrollEventThrottle={0}
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
    const liveItems = data.filter((item) => item.auctionType === "LIVE");
    const normalItems = data.filter((item) => item.auctionType === "NORMAL");
    setLiveItems(liveItems);
    setNormalItems(normalItems);
  }, []);

  useEffect(() => {
    const liveItems = data.filter((item) => item.auctionType === "LIVE");
    const normalItems = data.filter((item) => item.auctionType === "NORMAL");
    setLiveItems(liveItems);
    setNormalItems(normalItems);
  }, [data]);
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
