import {
  StyleSheet,
  SafeAreaView,
  View,
  Dimensions,
  useWindowDimensions,
  FlatList,
  Switch,
  Alert,
} from "react-native";
import ToggleSwitch from "toggle-switch-react-native";
import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/modules";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useNavigation } from "@react-navigation/native";
import Slider from "../Organisms/Carousel/slider";
import SliderSkeleton from "../Organisms/Carousel/sliderSkeleton";
import CustomTabBar from "../Organisms/ItemList/customTabBar";
import MainHeader from "../Molecules/Headers/mainHeader";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
type Props = {
  onRefresh: () => any | undefined;
  navigation: any;
  onScrollLive: () => any;
  onScrollNormal: () => any;
};

const Main = (props: Props) => {
  const data = useSelector((state: RootState) => state.mainLoader.data);
  const [liveItems, setLiveItems] = useState<any>([]);
  const [normalItems, setNormalItems] = useState<any>([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const navigation: any = useNavigation();
  const handleClickItem = async (item: any) => {
    try {
      const token = await AsyncStorageLib.getItem("accessToken");
      if (token) {
        if (item.auctionType === "NORMAL") {
          navigation.navigate("auctionDetail", {
            id: item.itemSeq,
          });
        } else {
          navigation.navigate("detail", {
            id: item.itemSeq,
          });
        }
      } else {
        navigation.navigate("profile");
        Alert.alert("계정", "로그인이 필요합니다.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearchClick = () => {
    navigation.navigate("searchNavigator");
  };

  useEffect(() => {
    if (isEnabled) {
      setNormalItems(
        normalItems.filter((item) => new Date(item.endTime) > new Date()),
      );
      setLiveItems(
        liveItems.filter((item) => new Date(item.endTime) > new Date()),
      );
    } else {
      const liveItems = data
        .filter((item) => item.auctionType === "LIVE")
        .sort((first, second) => (first.itemSeq > second.itemSeq ? -1 : 1));
      const normalItems = data
        .filter((item) => item.auctionType === "NORMAL")
        .sort((first, second) => (first.itemSeq > second.itemSeq ? -1 : 1));
      setLiveItems(liveItems);
      setNormalItems(normalItems);
    }
  }, [isEnabled]);
  const normalRoute = useCallback(
    () =>
      isLoading ? (
        <SliderSkeleton />
      ) : (
        <FlatList
          data={normalItems}
          style={{ flex: 1 }}
          refreshing={false}
          onRefresh={props.onRefresh}
          onEndReached={props.onScrollNormal}
          onEndReachedThreshold={0.8}
          keyExtractor={(data, index) => String(index)}
          renderItem={(data) => {
            return <Slider data={data} handleClickItem={handleClickItem} />;
          }}
        />
      ),
    [normalItems],
  );

  const liveRoute = useCallback(
    () =>
      isLoading ? (
        <SliderSkeleton />
      ) : (
        <>
          <FlatList
            data={liveItems}
            style={{ flex: 1 }}
            refreshing={false}
            onRefresh={props.onRefresh}
            onEndReached={props.onScrollLive}
            onEndReachedThreshold={0.8}
            scrollEnabled={true}
            keyExtractor={(data, index) => String(index)}
            renderItem={(data) => {
              return <Slider data={data} handleClickItem={handleClickItem} />;
            }}
          />
        </>
      ),
    [liveItems],
  );

  const { isLoading } = useSelector((state: RootState) => state.mainLoader);
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "NORMAL", title: "일반 경매" },
    { key: "LIVE", title: "실시간 경매" },
  ]);

  useEffect(() => {
    const liveItems = data
      .filter((item) => item.auctionType === "LIVE")
      .sort((first, second) => (first.itemSeq > second.itemSeq ? -1 : 1));
    const normalItems = data
      .filter((item) => item.auctionType === "NORMAL")
      .sort((first, second) => (first.itemSeq > second.itemSeq ? -1 : 1));
    setLiveItems(liveItems);
    setNormalItems(normalItems);
  }, []);

  useEffect(() => {
    if (isEnabled) {
      setNormalItems(
        normalItems.filter((item) => new Date(item.endTime) > new Date()),
      );
      setLiveItems(
        liveItems.filter((item) => new Date(item.endTime) > new Date()),
      );
    } else {
      const liveItems = data
        .filter((item) => item.auctionType === "LIVE")
        .sort((first, second) => (first.itemSeq > second.itemSeq ? -1 : 1));
      const normalItems = data
        .filter((item) => item.auctionType === "NORMAL")
        .sort((first, second) => (first.itemSeq > second.itemSeq ? -1 : 1));
      setLiveItems(liveItems);
      setNormalItems(normalItems);
    }
  }, [data]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MainHeader styles={styles} handleSearchClick={handleSearchClick} />
      <View style={styles.scrollView}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            marginRight: 10,
          }}
        >
          <ToggleSwitch
            isOn={isEnabled}
            onColor="#719dd7"
            offColor="#f8a33e"
            label="종료 물품 제거"
            labelStyle={{ color: "#444" }}
            size="medium"
            onToggle={() => setIsEnabled((prev) => !prev)}
          />
        </View>
        <TabView
          renderTabBar={(props) => <CustomTabBar props={props} />}
          navigationState={{ index, routes }}
          renderScene={({ route }) => {
            switch (route.key) {
              case "NORMAL":
                return normalRoute();
              case "LIVE":
                return liveRoute();
            }
          }}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </View>
      <StatusBar style="dark" backgroundColor={"#719DD7"} />
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  main: {
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "DoHyeonRegular",
  },
  scrollView: {
    flex: 6,
  },
});
