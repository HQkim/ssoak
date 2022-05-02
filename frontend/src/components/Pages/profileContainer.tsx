import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import KakaoLoginButton from "../Atoms/Buttons/kakaoLoginButton";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { kakaoProfile } from "../../apis/auth";

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
  const [profile, setProfile] = useState([]);

  const getAccessToken = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (token !== null) {
        setAccessToken(token);
        setIsLogin(true);
        kakaoProfile(token).then((res) => setProfile(res));
        console.log(profile);
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
        <ScrollView>
          <View
            style={{
              height: ScreenHeight / 3,
              backgroundColor: "#719DD7",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                flex: 1,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <View style={{ flex: 2 }}></View>
                <View
                  style={{
                    flex: 4,
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 40,
                    }}
                  >
                    쏙
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 2,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Fontisto name="bell" size={20} color="black" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Ionicons name="settings-outline" size={20} color="black" />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              height: ScreenHeight / 3,
              backgroundColor: "#ffff",
              alignItems: "center",
              zIndex: 1,
            }}
          >
            <Image
              style={{
                width: ScreenHeight / 6,
                height: ScreenHeight / 6,
                borderRadius: ScreenHeight / 12,
                position: "relative",
                marginTop: -ScreenHeight / 12,
              }}
              source={require("../../../assets/temp.jpg")}
            />
            <Feather
              name="camera"
              size={24}
              color="black"
              style={{
                position: "absolute",
                right: ScreenHeight / 6,
                marginTop: -ScreenHeight / 12,
              }}
              onPress={() => alert("clicked")}
            />
            <View
              style={{ alignItems: "center", marginTop: ScreenHeight / 50 }}
            >
              <Text style={{ fontSize: 20, padding: 10, fontWeight: "bold" }}>
                허재석
              </Text>
              <Text style={{ fontSize: 15, padding: 7, fontWeight: "bold" }}>
                이메일
              </Text>
              <Text style={{ fontSize: 15, padding: 7, fontWeight: "bold" }}>
                나의 등급
              </Text>
            </View>
          </View>
          {/* <View style={styles.divider}></View> */}
          <View style={{ height: ScreenHeight / 2, backgroundColor: "#ffff" }}>
            <View style={styles.viewSquare}>
              <TouchableOpacity onPress={() => navigation.navigate("Favorite")}>
                <View style={styles.viewShadow}>
                  <Text>찜한목록</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.viewShadow}>
                <Text>판매중</Text>
              </View>
            </View>
            <View style={styles.viewSquare}>
              <View style={styles.viewShadow}>
                <Text>구매완료</Text>
              </View>
              <View style={styles.viewShadow}>
                <Text>판매완료</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {/* <View style={styles.divider}></View> */}
          </View>
          <View style={{ height: ScreenHeight / 2, backgroundColor: "#ffff" }}>
            <View style={{ marginTop: ScreenHeight / 20 }}>
              <View style={styles.informView}>
                <Ionicons
                  name="document-text-outline"
                  size={24}
                  color="black"
                />
                <Text style={{ fontSize: 15, padding: 15 }}>이용약관</Text>
              </View>
              <View style={styles.informView}>
                <AntDesign name="profile" size={24} color="black" />
                <Text style={{ fontSize: 15, padding: 15 }}>
                  내부정보관리규정
                </Text>
              </View>
              <View style={styles.informView}>
                <Ionicons
                  name="information-circle-outline"
                  size={24}
                  color="black"
                />
                <Text style={{ fontSize: 15, padding: 15 }}>
                  개인정보처리방침
                </Text>
              </View>
              <View style={styles.informView}>
                <AntDesign name="sound" size={24} color="black" />
                <Text style={{ fontSize: 15, padding: 15 }}>공지사항</Text>
              </View>
              <View style={styles.informView}>
                <MaterialIcons name="logout" size={24} color="black" />
                <Text style={{ fontSize: 15, padding: 15 }}>로그아웃</Text>
              </View>
              <View style={styles.informView}>
                <Ionicons name="settings-outline" size={20} color="black" />
                <Text style={{ fontSize: 15, padding: 15 }}>설정</Text>
              </View>
            </View>
          </View>
        </ScrollView>
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
  },
  informView: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 30,
  },
  divider: {
    height: 1,
    width: ScreenHeight / 2,
    backgroundColor: "#7D7D7D",
  },
});
