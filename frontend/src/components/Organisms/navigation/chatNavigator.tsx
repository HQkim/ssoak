import { StyleSheet, Dimensions } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NavigatorTitle from "../../Atoms/Typographies/navigatorTitle";
import ChatListContainer from "../../Pages/chatListContainer";
import ChatContainer from "../../Pages/chatContainer";
import MainChat from "../../Templates/mainChat";
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
        component={ChatContainer}
        options={{ title: "채팅 리스트" }}
      />
      <Stack.Screen
        name="chat"
        component={MainChat}
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
