import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import KakaoLoginButton from "../Atoms/Buttons/kakaoLoginButton";
import { kakaoProfile } from "../../apis/auth";
import Profile from "../Templates/profile";
import { useSelector } from "react-redux";
import { RootState } from "../../store/modules";
import { useDispatch } from "react-redux";
import { dataFetchAsync } from "../../store/modules/mainLoader";
import AppleLoginButton from "../Atoms/Buttons/appleLoginButton";

const LogoImage = require("../../../assets/loading/loadingImg.jpg");
const { height: ScreenHeight } = Dimensions.get("window");
const { width: ScreenWidth } = Dimensions.get("window");

type Props = {
  navigation: any;
  route: object;
};

type Profile = {
  email: string;
  grade: number;
  nickname: string;
  profileImageUrl: string;
  seq: number;
};

const ProfileContainer = ({ navigation, route }: Props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [font, setFont] = useState(false);
  const [profile, setProfile] = useState<Profile | null | any>([]);
  const isLoading = useSelector(
    (state: RootState) => state.mainLoader.isLoading,
  );

  const dispatch = useDispatch();

  const onStartLoading = (state: boolean) => {
    dispatch(dataFetchAsync(state));
  };

  const getAccessToken = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      console.log("1-------------------------------------------------", token);
      if (token !== null) {
        setAccessToken(token);
        setIsLogin(true);
        try {
          console.log("2-----------------------------------------------");
          kakaoProfile(token).then((res) => {
            console.log("첫번째---------------------------------", res);
            setProfile(res.data);
          });
          console.log("3----------------------------------------------------");
        } catch (err) {
          console.log("4-----------------------------------------------", err);
        }
      }
    } catch (e) {
      console.log(
        "5----------------------------------------------------------------",
        e,
      );
    }
  };

  const loadKakaoLogin = () => {
    navigation.navigate("kakaoLogin");
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      onStartLoading(false);
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
        <Profile
          onRefresh={() => onStartLoading(true)}
          profile={profile}
          navigation={navigation}
          route={route}
        />
      ) : (
        <View style={styles.container}>
          <Image source={LogoImage} style={styles.logoImg} />
          {font ? <Text style={styles.title}>내 손 안에 경매장</Text> : null}
          {font ? <Text style={styles.mainTitle}>쏙</Text> : null}
          <KakaoLoginButton loadKakaoLogin={loadKakaoLogin} />
          <AppleLoginButton />
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
  viewSquare: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: ScreenHeight / 25,
  },
  viewShadow: {
    width: ScreenHeight / 5,
    height: ScreenHeight / 5,
    borderRadius: ScreenHeight / 40,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: "white",
    justifyContent: "space-around",
    alignItems: "center",
  },
  informView: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: ScreenWidth / 14,
  },
  divider: {
    borderBottomColor: "#d7d4d4",
    borderBottomWidth: 1,
    marginLeft: ScreenHeight / 20,
    marginRight: ScreenHeight / 20,
  },
});
