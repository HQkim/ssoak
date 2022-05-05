import { StyleSheet, Dimensions, TouchableOpacity, Text } from "react-native";
import React, { useState, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ItemCreation from "../Templates/itemCreation";
import NavigatorTitle from "../Atoms/Typographies/navigatorTitle";
import { useNavigation } from "@react-navigation/native";

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");

type Props = {
  navigation: any;
  route: object;
};

const Stack = createStackNavigator();
const CreateNavigator = (props: Props) => {
  const navigation = useNavigation();

  const onCancel = () => {
    navigation.navigate("main");
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#719DD7",
        },
      }}
    >
      <Stack.Screen
        name="ItemCreation"
        component={ItemCreation}
        options={{
          headerTitleAlign: "center",
          headerTitle: (props) => (
            <NavigatorTitle
              title={"경매 물품 등록"}
              style={styles.navigatorTitle}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={onCancel}
              style={{ marginHorizontal: ScreenWidth / 16 }}
            >
              <Text style={styles.navigatorTitle}>X</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default CreateNavigator;

const styles = StyleSheet.create({
  navigatorTitle: {
    fontSize: 20,
    fontWeight: "300",
  },
});
