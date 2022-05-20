import { StyleSheet, Dimensions, TouchableOpacity, Text } from "react-native";
import React, { Children, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NavigatorTitle from "../Atoms/Typographies/navigatorTitle";
import { useNavigation } from "@react-navigation/native";
import ImageBrowser from "../Molecules/Images/imageBroser";
import ImageCreateContainer from "../Molecules/Images/imageCreateContainer";

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");

type Props = {
  navigation: any;
  route: object;
};

const Stack = createStackNavigator();
const CreateNavigator = (props: Props) => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#719DD7",
        },
      }}
    >
      <Stack.Screen
        name="ImageCreate"
        component={ImageCreateContainer}
        options={{
          headerTitleAlign: "center",
          headerTitle: (props) => (
            <NavigatorTitle
              title={"경매 물품 등록"}
              style={styles.navigatorTitle}
            />
          ),
        }}
      />
      <Stack.Screen
        name="ImageBrowser"
        component={ImageBrowser}
        options={{
          title: "Selected 0 files",
          headerStyle: {
            backgroundColor: "#ffffff",
          },
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
