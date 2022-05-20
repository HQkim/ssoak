import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Favorite from "../Templates/favorite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

type Props = {
  navigation: any;
  route: object;
};

const Stack = createStackNavigator();

const FavoriteContainer = ({ navigation, route }: Props) => {
  const [isLogin, setIsLogin] = useState(false);
  const onCancel = () => {
    navigation.navigate("main");
  };

  const getToken = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
      setIsLogin(true);
    } else if (token == null) {
      setIsLogin(false);
      navigation.navigate("Profile");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getToken();
    }, []),
  );

  return (
    <View>
      {isLogin == true ? (
        <Favorite navigation={navigation} route={route} />
      ) : null}
    </View>
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
