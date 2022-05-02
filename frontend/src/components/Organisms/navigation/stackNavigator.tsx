import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuctionChatContainer from "../../Pages/auctionChatContainer";
import DetailContainer from "../../Pages/detailContainer";
import MainContainer from "../../Pages/mainContainer";
import AuctionDetailContainer from "../../Pages/auctionDetailContainer";
import AuctionContainer from "../../Pages/auctionContainer";
import NavigatorTitle from "../../Atoms/Typographies/navigatorTitle";
import KakaoLoginContainer from "../../Pages/kakaoLoginContainer";

type Props = {};

const Stack = createStackNavigator();
const { width: ScreenWidth } = Dimensions.get("window");
const MainStackNavigator = (props: Props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#719DD7",
        },

        headerBackTitleVisible: false,
        headerBackTitleStyle: {
          color: "black",
          fontSize: 15,
        },
        headerTintColor: "black",
      }}
    >
      <Stack.Screen
        name="main"
        component={MainContainer}
        options={{ headerShown: false, title: "메인 화면" }}
      />
      <Stack.Screen
        name="detail"
        component={DetailContainer}
        options={{
          headerTitleAlign: "center",
          headerTitle: (props) => (
            <NavigatorTitle
              title={"물품 상세 정보"}
              style={styles.navigatorTitle}
            />
          ),
        }}
      />
      <Stack.Screen
        name="auctionDetail"
        component={AuctionDetailContainer}
        options={{
          headerTitleAlign: "center",
          headerTitle: (props) => (
            <NavigatorTitle
              title={"물품 상세 정보"}
              style={styles.navigatorTitle}
            />
          ),
        }}
      />
      <Stack.Screen
        name="auction"
        component={AuctionContainer}
        options={{
          headerTitleAlign: "center",
          headerTitle: (props) => (
            <NavigatorTitle
              title={"물품 입찰 정보"}
              style={styles.navigatorTitle}
            />
          ),
        }}
      />
      <Stack.Screen
        name="auctionChat"
        component={AuctionChatContainer}
        options={{
          headerTitleAlign: "center",
          headerTitle: (props) => (
            <NavigatorTitle
              title={"실시간 경매 채팅"}
              style={styles.navigatorTitle}
            />
          ),
        }}
      />
      <Stack.Screen
        name="kakaoLogin"
        component={KakaoLoginContainer}
        options={{ headerShown: false, title: "카카오 로그인 화면" }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;

const styles = StyleSheet.create({
  navigatorTitle: {
    fontSize: 20,
  },
});
