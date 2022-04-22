import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { ReactNode } from "react";
import MainContainer from "../../Pages/mainContainer";
import FavoriteContainer from "../../Pages/favoriteContainer";
import ProfileContainer from "../../Pages/profileContainer";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, GestureResponderEvent } from "react-native";
import CustomTabBarButton from "../../Atoms/Buttons/customTabBarButton";
import NavigateButton from "../../Atoms/Buttons/navigateButton";

type Props = {};

type ButtonProps = {
  [key: string]: string | Function | object | ReactNode;
  onPress: (event: GestureResponderEvent) => void;
};

const Tab = createBottomTabNavigator();

const index = (_props: Props) => {
  return (
    <Tab.Navigator
      screenOptions={(props: any) => ({
        tabBarIcon: ({ color, size }) => {
          //Antd error로 인한 switch문
          return (
            <NavigateButton
              name={props.route.name}
              color={color}
              size={size}
              route={props.route.name}
            />
          );
        },
        ...navigateOptions,
      })}
    >
      <Tab.Screen name="Home" component={MainContainer} />
      <Tab.Screen name="Favorite" component={FavoriteContainer} />
      <Tab.Screen
        name="+"
        component={FavoriteContainer}
        options={{
          tabBarButton: (props) => (
            <CustomTabBarButton
              {...props}
              styles={{
                centerOpacity: styles.centerOpacity,
                centerButton: styles.centerButton,
              }}
            />
          ),
        }}
      />
      <Tab.Screen name="Chat" component={FavoriteContainer} />
      <Tab.Screen name="Profile" component={ProfileContainer} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  centerButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#EA759A",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
  },
  centerOpacity: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
});

const navigateOptions = {
  tabBarShowLabel: true,
  tabBarActiveTintColor: "#719DD7",
  tabBarInactiveTintColor: "black",
  headerShown: false,
  tabBarHideOnKeyboard: true,
  tabBarStyle: {
    position: "relative",
    paddingTop: 10,
  },
};

export default index;
