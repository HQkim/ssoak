import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileContainer from "../../Pages/profileContainer";
import FavoriteContainer from "../../Pages/favoriteContainer";
import OnSaleContainer from "../../Pages/onSaleContainer";
import PurchasedContainer from "../../Pages/purchasedContainer";
import HistoryContainer from "../../Pages/historyContainer";
import NavigatorTitle from "../../Atoms/Typographies/navigatorTitle";
import SettingContainer from "../../Pages/settingContainer";
import TermsOfService from "../../Pages/termsOfService";
import InformRegulation from "../../Pages/informRegulation";
import PrivacyPolicy from "../../Pages/privacyPolicy";

type Props = {};

const Stack = createStackNavigator();
const { width: ScreenWidth } = Dimensions.get("window");
const ProfileStackNavigator = (props: Props) => {
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
        name="profile"
        component={ProfileContainer}
        options={{ headerShown: false, title: "마이페이지" }}
      />
      <Stack.Screen
        name="favorite"
        component={FavoriteContainer}
        options={{
          headerTitleAlign: "center",
          headerTitle: (props) => (
            <NavigatorTitle title={"찜한 목록"} style={styles.navigatorTitle} />
          ),
        }}
      />
      <Stack.Screen
        name="onsale"
        component={OnSaleContainer}
        options={{
          headerTitleAlign: "center",
          headerTitle: (props) => (
            <NavigatorTitle
              title={"판매중 목록"}
              style={styles.navigatorTitle}
            />
          ),
        }}
      />
      <Stack.Screen
        name="purchase"
        component={PurchasedContainer}
        options={{
          headerTitleAlign: "center",
          headerTitle: (props) => (
            <NavigatorTitle
              title={"구매완료 목록"}
              style={styles.navigatorTitle}
            />
          ),
        }}
      />
      <Stack.Screen
        name="history"
        component={HistoryContainer}
        options={{
          headerTitleAlign: "center",
          headerTitle: (props) => (
            <NavigatorTitle
              title={"판매이력 목록"}
              style={styles.navigatorTitle}
            />
          ),
        }}
      />
      <Stack.Screen
        name="setting"
        component={SettingContainer}
        options={{
          headerTitleAlign: "center",
          headerTitle: (props) => (
            <NavigatorTitle title={"설정"} style={styles.navigatorTitle} />
          ),
        }}
      />
      <Stack.Screen
        name="terms"
        component={TermsOfService}
        options={{
          headerTitleAlign: "center",
          headerTitle: (props) => (
            <NavigatorTitle title={"이용약관"} style={styles.navigatorTitle} />
          ),
        }}
      />
      <Stack.Screen
        name="regulation"
        component={InformRegulation}
        options={{
          headerTitleAlign: "center",
          headerTitle: (props) => (
            <NavigatorTitle
              title={"내부정보관리규정"}
              style={styles.navigatorTitle}
            />
          ),
        }}
      />
      <Stack.Screen
        name="privacy"
        component={PrivacyPolicy}
        options={{
          headerTitleAlign: "center",
          headerTitle: (props) => (
            <NavigatorTitle
              title={"개인정보처리방침"}
              style={styles.navigatorTitle}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;

const styles = StyleSheet.create({
  navigatorTitle: {
    fontSize: 20,
  },
});
