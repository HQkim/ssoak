import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { instance } from "../../apis/instance";
import * as Font from "expo-font";
import KakaoLoginButton from "../Atoms/Buttons/kakaoLoginButton";

const LogoImage = require("../../../assets/loading/loadingImg.jpg");
const { height: ScreenHeight } = Dimensions.get("window");

type Props = {
  navigation: any;
  route: object;
};

const ProfileContainer = ({ navigation, route }: Props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [font, setFont] = useState(false);

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
    async function loadFonts() {
      await Font.loadAsync({
        DoHyeonRegular: require("../../../assets/fonts/DoHyeon-Regular.ttf"),
      });
      setFont(true);
    }
    loadFonts();
  }, [navigation]);
  return (
    <View>
      {isLogin ? (
        <Text>마이프로필페이지</Text>
      ) : (
        <View style={styles.container}>
          <Image source={LogoImage} style={styles.logoImg} />
          {font ? <Text style={styles.title}>내 손 안에 경매장</Text> : null}
          {font ? <Text style={styles.mainTitle}>쏙</Text> : null}
          <KakaoLoginButton loadKakaoLogin={loadKakaoLogin} />
        </View>
      )}
    </View>
  );
};

export default ProfileContainer;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#719DD7",
    alignItems: "center",
  },
  logoImg: {
    width: ScreenHeight / 5,
    height: ScreenHeight / 5,
    borderRadius: ScreenHeight / 1,
    marginTop: ScreenHeight / 5,
    marginBottom: ScreenHeight / 20,
  },
  title: {
    fontSize: ScreenHeight / 30,
    color: "#ffff",
    fontFamily: "DoHyeonRegular",
  },
  mainTitle: {
    fontSize: ScreenHeight / 15,
    color: "#ffff",
    marginTop: ScreenHeight / 100,
    marginBottom: ScreenHeight / 20,
    fontFamily: "DoHyeonRegular",
  },
});
