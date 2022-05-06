import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

import React, { ReactNode, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";
import { RootState } from "../../store/modules";
import SearchButton from "../Atoms/Buttons/searchButton";
import BellIcon from "../Atoms/Buttons/bellIcon";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
type Props = {
  onRefresh: () => any | undefined;
  navigation: any;
};
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get("window");
const FirstRoute = () => <View style={{ flex: 1 }} />;
const SecondRoute = () => <View style={{ flex: 1 }} />;

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});
const Main = (props: Props) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "일반 경매" },
    { key: "second", title: "실시간 경매" },
  ]);
  const { isLoading } = useSelector((state: RootState) => state.mainLoader);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <Text style={styles.main}>쏙</Text>
      </View>
      <View style={styles.scrollView}>
        <ScrollView contentContainerStyle={styles.scrollView}>
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
        </ScrollView>
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
    flex: 8,
  },
});
