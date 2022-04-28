import { StyleSheet, Dimensions, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ItemCreation from "../Templates/itemCreation";
import NavigatorTitle from "../Atoms/Typographies/navigatorTitle";

type Props = {};
const { height: ScreenHeight } = Dimensions.get("window");

const Stack = createStackNavigator();
const CreateNavigator = (props: Props) => {
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
          headerTitle: (props) => (
            <NavigatorTitle
              title={"경매물품 등록하기"}
              style={styles.navigatorTitle}
            />
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
    fontWeight: "200",
  },
});
