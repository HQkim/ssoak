import {
  StyleSheet,
  SafeAreaView,
  View,
  Dimensions,
  useWindowDimensions,
  FlatList,
} from "react-native";

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
  const navigation: any = useNavigation();

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

  const handleSearchClick = () => {
    navigation.navigate("searchNavigator");
  };

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
      <MainHeader styles={styles} handleSearchClick={handleSearchClick} />
      <View style={styles.scrollView}>
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
      <StatusBar style="auto" />
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
    fontSize: Dimensions.get("window").width / 15,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 15,
  },
});
