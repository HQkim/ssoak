import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { kakaoProfile } from "../../apis/auth";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../store/modules";
import { useNavigation } from "@react-navigation/native";
import NavigateButton from "../Atoms/Buttons/navigateButton";

type Props = {
  onRefresh: () => any | undefined;
  navigation: any | undefined;
  route: object;
  profile: {
    email: string;
    grade: number;
    nickname: string;
    profileImageUrl: string;
    seq: number;
  };
};

const { height: ScreenHeight } = Dimensions.get("window");
const { width: ScreenWidth } = Dimensions.get("window");

const Profile = (props: Props) => {
  const isLoading = useSelector(
    (state: RootState) => state.mainLoader.isLoading
  );
  const navigation = useNavigation();
  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={props.onRefresh} />
        }
      >
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
            source={{ uri: props.profile.profileImageUrl }}
            // source={require("../../../assets/temp.jpg")}
          />
          <Feather
            name="camera"
            size={24}
            color="black"
            style={{
              position: "absolute",
              right: ScreenWidth / 3,
              marginTop: -ScreenHeight / 12,
            }}
            onPress={() => alert("clicked")}
          />
          <View style={{ alignItems: "center", marginTop: ScreenHeight / 50 }}>
            <Text style={{ fontSize: 20, padding: 10, fontWeight: "bold" }}>
              {props.profile.nickname}
              test
            </Text>
            <Text style={{ fontSize: 15, padding: 7, fontWeight: "bold" }}>
              {props.profile.email}
              test
            </Text>
            <Text style={{ fontSize: 15, padding: 7, fontWeight: "bold" }}>
              {props.profile.grade}
              test
            </Text>
          </View>
        </View>
        <View style={{ backgroundColor: "#ffff" }}>
          <View style={styles.divider}></View>
          <View style={{ height: ScreenWidth, backgroundColor: "#ffff" }}>
            <View style={styles.viewSquare}>
              <TouchableOpacity onPress={() => navigation.navigate("favorite")}>
                <View style={styles.viewShadow}>
                  <View></View>
                  <Ionicons
                    name="heart"
                    size={ScreenWidth / 5}
                    color="#EA759A"
                  />
                  <Text>찜한목록</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("onsale")}>
                <View style={styles.viewShadow}>
                  <View></View>
                  <Ionicons
                    name="cart"
                    size={ScreenWidth / 5}
                    color="#98ADFA"
                  />
                  <Text>판매중 목록</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.viewSquare}>
              <TouchableOpacity onPress={() => navigation.navigate("purchase")}>
                <View style={styles.viewShadow}>
                  <View></View>
                  <Ionicons
                    name="briefcase"
                    size={ScreenWidth / 5}
                    color="#DF7A1D"
                  />
                  <Text>구매완료 목록</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("history")}>
                <View style={styles.viewShadow}>
                  <View></View>
                  <FontAwesome5
                    name="inbox"
                    size={ScreenWidth / 5}
                    color="#AEF5B5"
                  />
                  <Text>판매이력 목록</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.divider}></View>
        </View>
        <View style={{ height: ScreenHeight / 2, backgroundColor: "#ffff" }}>
          <View style={{ marginTop: ScreenHeight / 20 }}>
            <View style={styles.informView}>
              <Ionicons name="document-text-outline" size={24} color="black" />
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
    </View>
  );
};

export default Profile;

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
