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
} from "react-native";

import React, { ReactNode, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import ItemSlider from "../Organisms/ItemSlider";
import { useSelector } from "react-redux";
import { RootState } from "../../store/modules";
import SearchButton from "../Atoms/Buttons/searchButton";
import BellIcon from "../Atoms/Buttons/bellIcon";

type Props = {
  onRefresh: () => any | undefined;
  navigation: any;
};
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get("window");

const Main = (props: Props) => {
  const isLoading = useSelector(
    (state: RootState) => state.mainLoader.isLoading
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={props.onRefresh} />
        }
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: (ScreenWidth * 9) / 16,
            backgroundColor: "#719DD7",
            marginBottom: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              // alignItems: "center",
              marginTop: 20,
            }}
          >
            <View style={{ flex: 1 }} />
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                }}
              >
                쏙
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-end",
                marginEnd: 10,
              }}
            >
              <View style={{ marginRight: 10 }}>
                <SearchButton
                  onPress={() => props.navigation.navigate("searchNavigator")}
                  size={24}
                />
              </View>

              <View>
                <BellIcon onPress={() => {}} size={24} />
              </View>
            </View>
          </View>
        </View>
        <ItemSlider>
          <TouchableOpacity onPress={() => {}}>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                // justifyContent: "space-between",
                alignItems: "flex-end",
                margin: 10,
                marginLeft: 20,
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
                marginLeft: 20,
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
                marginLeft: 20,
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
