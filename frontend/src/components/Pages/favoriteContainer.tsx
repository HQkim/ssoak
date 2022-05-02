import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Favorite from "../Templates/favorite";

type Props = {
  navigation: any;
  route: object;
};

const Stack = createStackNavigator();

const FavoriteContainer = ({ navigation, route }: Props) => {
  const onCancel = () => {
    navigation.navigate("main");
  };
  useEffect(() => {
    navigation.addListener("focus", () => {
      console.log("hi");
    });
  }, [navigation]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#719DD7",
        },
      }}
    >
      <Stack.Screen
        name="FavoriteTemplate"
        component={Favorite}
        options={{
          title: "찜한 목록",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              onPress={onCancel}
              style={{ marginHorizontal: 20 }}
            >
              <Text style={styles.navigatorCancle}>X</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default FavoriteContainer;

const styles = StyleSheet.create({
  navigatorTitle: {
    fontSize: 20,
    fontWeight: "200",
  },
  navigatorCancle: {
    fontSize: 20,
    fontWeight: "200",
  },
});
