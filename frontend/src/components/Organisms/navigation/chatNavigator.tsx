import { StyleSheet, Dimensions } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NavigatorTitle from "../../Atoms/Typographies/navigatorTitle";
import ChatListContainer from "../../Pages/chatListContainer";
import ChatContainer from "../../Pages/chatContainer";
type Props = {};

const Stack = createStackNavigator();
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
        name="chatList"
        component={ChatListContainer}
        options={{ headerShown: false, title: "메인 화면" }}
      />
      <Stack.Screen
        name="chat"
        component={ChatContainer}
        options={{
          headerTitleAlign: "center",
          headerTitle: (props) => (
            <NavigatorTitle title="채팅방" style={styles.navigatorTitle} />
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
