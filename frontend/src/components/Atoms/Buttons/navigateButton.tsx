import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";

type Props = {
  [name: string]: string | number;
  color: string;
  size: number;
};

const NavigateButton = (props: Props) => {
  let iconName;
  let navigateIcon;
  switch (props.name) {
    case "Home":
      iconName = props.name === props.route ? "md-home" : "md-home-outline";
      break;
    case "Profile":
      iconName = props.name === props.route ? "person-sharp" : "person-outline";
      break;
    case "Chat":
      iconName =
        props.name === props.route
          ? "chatbubble-ellipses"
          : "chatbubble-ellipses-outline";
      break;
    case "Favorite":
      iconName = props.name === props.route ? "heart-sharp" : "heart-outline";
      break;
  }
  return (
    <View>
      <Ionicons name={iconName} color={props.color} size={props.size} />
    </View>
  );
};

export default NavigateButton;

const styles = StyleSheet.create({});
