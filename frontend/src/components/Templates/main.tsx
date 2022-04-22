import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  View,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { ReactNode, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import ItemSlider from "../Organisms/ItemSlider";
import { useSelector } from "react-redux";
import { RootState } from "../../store/modules";

type Props = {
  onRefresh: (state: boolean) => any;
};
const ScreenHeight = Dimensions.get("window").height;

const Main = (props: Props) => {
  const isLoading = useSelector(
    (state: RootState) => state.mainLoader.isLoading,
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: ScreenHeight / 20,
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>쏙</Text>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={props.onRefresh} />
        }
      >
        <ItemSlider>
          <TouchableOpacity onPress={() => {}}>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                // justifyContent: "space-between",
                alignItems: "flex-end",
                margin: 10,
              }}
            >
              <Text style={{ fontSize: 18 }}>마감임박 경매</Text>
              <Text style={{ color: "red" }}> 바로가기 {">"}</Text>
            </View>
          </TouchableOpacity>
        </ItemSlider>
        <ItemSlider>
          <TouchableOpacity onPress={() => {}}>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                // justifyContent: "space-between",
                alignItems: "flex-end",
                margin: 10,
              }}
            >
              <Text style={{ fontSize: 18 }}>예정중인 경매</Text>
              <Text style={{ color: "red" }}> 바로가기 {">"}</Text>
            </View>
          </TouchableOpacity>
        </ItemSlider>
        <ItemSlider>
          <TouchableOpacity onPress={() => {}}>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                // justifyContent: "space-between",
                alignItems: "flex-end",
                margin: 10,
              }}
            >
              <Text style={{ fontSize: 18 }}>진행중인 경매</Text>
              <Text style={{ color: "red" }}> 바로가기 {">"}</Text>
            </View>
          </TouchableOpacity>
        </ItemSlider>
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({});
