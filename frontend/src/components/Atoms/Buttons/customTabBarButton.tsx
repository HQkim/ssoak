import React from "react";
import { TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

const CustomTabBarButton = (props: any) => {
  const route = useRoute();

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={props.styles.centerOpacity}
      activeOpacity={0.01}
    >
      <View
        style={[
          props.styles.centerButton,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <AntDesign name="plus" color="#444444" size={24} />
      </View>
    </TouchableOpacity>
  );
};

export default CustomTabBarButton;
