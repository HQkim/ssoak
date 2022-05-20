import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
} from "react-native";
import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuctionChatContainer from "../../Pages/auctionChatContainer";
import DetailContainer from "../../Pages/detailContainer";
import MainContainer from "../../Pages/mainContainer";
import AuctionDetailContainer from "../../Pages/auctionDetailContainer";
import AuctionContainer from "../../Pages/auctionContainer";
import NavigatorTitle from "../../Atoms/Typographies/navigatorTitle";
import KakaoLoginContainer from "../../Pages/kakaoLoginContainer";
import SearchStackNavigator from "./searchStackNavigator";
import ItemModificationContainer from "../../Pages/itemModificationContainer";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type Props = {};

const Stack = createStackNavigator();
const { width: ScreenWidth } = Dimensions.get("window");
const MainStackNavigator = (props: Props) => {
  const navigation = useNavigation();
  const [select, setSelect] = useState(false);

  const onSelect = () => {
    setSelect(!select);
  };

  const onUpdate = () => {
    navigation.navigate("itemModification");
  };

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
        name="itemModification"
        component={ItemModificationContainer}
        options={{
          headerTitleAlign: "center",
          headerTitle: (props) => (
            <NavigatorTitle
              title={"물품 정보 수정"}
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
      <Stack.Screen
        name="searchNavigator"
        component={SearchStackNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;

const styles = StyleSheet.create({
  navigatorTitle: {
    fontSize: 20,
  },
  dropdown: {
    position: "absolute",
    top: -10,
    right: -10,
  },
  dropdownContainer: {
    position: "absolute",
    right: 45,
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
