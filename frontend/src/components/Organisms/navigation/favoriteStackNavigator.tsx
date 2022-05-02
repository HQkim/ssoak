import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FavoriteContainer from "../../Pages/favoriteContainer";
import HistroyContainer from "../../Pages/historyContainer";
import NavigatorTitle from "../../Atoms/Typographies/navigatorTitle";

type Props = {};

const Stack = createStackNavigator();
const { width: ScreenWidth } = Dimensions.get("window");
const FavoriteStackNavigator = ({ navigation, route }) => {
  const onCancel = () => {
    navigation.navigate("main");
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
        name="hitory"
        component={HistroyContainer}
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
    </Stack.Navigator>
  );
};

export default FavoriteStackNavigator;

const styles = StyleSheet.create({
  navigatorTitle: {
    fontSize: 20,
  },
});
