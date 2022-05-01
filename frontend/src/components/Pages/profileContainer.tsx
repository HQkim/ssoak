import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { instance } from "../../apis/instance";

type Props = {
  navigation: any;
  route: object;
};

const ProfileContainer = ({ navigation, route }: Props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  const getAccessToken = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (token !== null) {
        setAccessToken(token);
        setIsLogin(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const loadKakaoLogin = () => {
    navigation.navigate("kakaoLogin");
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      getAccessToken();
    });
  }, [navigation]);
  return (
    <View>
      {isLogin ? (
        <Text>마이프로필페이지</Text>
      ) : (
        <View style={{ marginTop: 500 }}>
          <Button title="Kakao Login" onPress={loadKakaoLogin} />
        </View>
      )}
    </View>
  );
};

export default ProfileContainer;

const styles = StyleSheet.create({});
