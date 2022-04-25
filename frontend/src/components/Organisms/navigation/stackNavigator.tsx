import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// import DetailContainer from "../../Pages/detailContainer";
import MainContainer from "../../Pages/mainContainer";
import NavigatorTitle from "../../Atoms/Typographies/navigatorTitle";

type Props = {};

const Stack = createStackNavigator();
const MainStackNavigator = (props: Props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#719DD7",
        },

        // headerBackTitleVisible: false,
        // headerBackTitleStyle: {
        //   color: "black",
        //   fontSize: 15,
        // },
        // headerTintColor: "black",
      }}
    >
      <Stack.Screen
        name="main"
        component={MainContainer}
        options={{ headerShown: false, title: "메인 화면" }}
      />
      <Stack.Screen
        name="detail"
        component={MainContainer}
        options={{
          headerTitle: (props) => (
            <NavigatorTitle
              title={"물품 상세 정보"}
              style={styles.navigatorTitle}
            />
          ),
        }}
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
