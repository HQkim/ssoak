import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  TextInput,
  Alert,
  Platform,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../store/modules";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { editKakaoProfile } from "../../apis/auth";
import * as Font from "expo-font";
import OtherSetting from "../Templates/otherSetting";

type Props = {
  navigation: any | undefined;
  route: object;
  profile: {
    email: string;
    grade: number;
    nickname: string;
    profileImageUrl: string;
    seq: number;
  };
  token: string;
  setAccessToken: Function;
  setProfile: Function;
  setEditStatus: Function;
  editStatus: boolean;
  setName: Function;
  name: string | null | any;
};

interface Item {
  imgSource: string;
}
interface File {
  imgFile: string;
}

const { height: ScreenHeight } = Dimensions.get("window");
const { width: ScreenWidth } = Dimensions.get("window");

const Profile = (props: Props) => {
  const navigation: any = useNavigation();
  const [font, setFont] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        DoHyeonRegular: require("../../../assets/fonts/DoHyeon-Regular.ttf"),
      });
      setFont(true);
    }
    loadFonts();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem("accessToken");
    props.setAccessToken("");
    props.navigation.navigate("main");
  };
  const [image, setImage] = useState<Item | null | any>(
    props.profile.profileImageUrl
  );
  const [file, setFile] = useState<File | null | any>([]);
  const [name, setName] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
    });
    console.log(result);
    if (!result.cancelled) {
      const uri = result.uri;
      const newFile = result;
      setImage(result.uri);
      setFile(result);
      const formData = new FormData();

      const trimmedURI_android = uri;

      const fileName_android = trimmedURI_android.split("/").pop();
      const item: any = {
        type: "image/jpeg",
        uri: trimmedURI_android,
        name: fileName_android,
      };
      formData.append("profileImage", item);
      await editKakaoProfile(formData).then(() =>
        props.setProfile({ ...props.profile, profileImageUrl: uri })
      );
    }
  };

  const editName = async () => {
    if (props.editStatus == false) {
      props.setEditStatus(!props.editStatus);
    } else if (props.editStatus == true && !name) {
      Alert.alert("닉네임을 입력해주세요");
    } else if (props.editStatus == true && name) {
      const formData = new FormData();
      formData.append("nickname", name);
      await editKakaoProfile(formData);
      props.profile.nickname = name;
      props.setEditStatus(!props.editStatus);
    }
  };

  return (
    <View style={{ backgroundColor: "#fffff" }}>
      <ScrollView style={{ backgroundColor: "#fffff" }}>
        <View
          style={{
            height: ScreenHeight / 2.3,
            backgroundColor: "#719DD7",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
              marginTop: ScreenHeight / 8,
            }}
          >
            {font ? <Text style={styles.fontStyle}>Profile</Text> : null}
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#ffff",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={pickImage}>
            <Image
              style={{
                width: ScreenHeight / 6,
                height: ScreenHeight / 6,
                borderRadius: ScreenHeight / 12,
                position: "relative",
                marginTop: -ScreenHeight / 12,
                borderColor: "#d7d4d4",
                borderWidth: 1,
              }}
              source={{ uri: props.profile.profileImageUrl }}
            />
            <Feather
              name="camera"
              size={28}
              color="#0000009c"
              style={{
                position: "relative",
                left: ScreenHeight / 12,
                bottom: ScreenHeight / 6,
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: "#ffff",
            alignItems: "center",
            // zIndex: 1,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: ScreenHeight / 20,
            }}
          >
            {props.editStatus == false ? (
              <TouchableOpacity onPress={editName}>
                <View style={{ flexDirection: "row", padding: 5 }}>
                  <TextInput
                    style={{
                      fontSize: 20,
                      fontWeight: "200",
                      marginRight: 5,
                    }}
                    editable={false}
                    // textAlign="center"
                    value={props.profile.nickname}
                    maxLength={5}
                  />
                  <AntDesign name="edit" size={24} color="black" />
                </View>
              </TouchableOpacity>
            ) : (
              <>
                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    style={{
                      fontSize: 20,
                      fontWeight: "200",
                      // position: "relative",
                      color: "black",
                      width: "50%",
                      borderBottomWidth: 1,
                    }}
                    editable={true}
                    textAlign="center"
                    value={name}
                    maxLength={5}
                    onChangeText={setName}
                    placeholder={props.profile.nickname}
                  />
                  <AntDesign
                    name="checkcircleo"
                    size={24}
                    color="black"
                    onPress={editName}
                  />
                </View>
              </>
            )}
            <Text style={{ fontSize: 20, fontWeight: "200", padding: 5 }}>
              Email : {props.profile.email}
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "200", padding: 5 }}>
              Point : {props.profile.grade}
            </Text>
          </View>
        </View>
        <View style={{ backgroundColor: "#ffff" }}>
          <View style={styles.divider} />
          <View style={styles.viewSquare}>
            <TouchableOpacity onPress={() => navigation.navigate("favorite")}>
              <View style={styles.viewShadow}>
                <View></View>
                <Ionicons name="heart" size={ScreenWidth / 5} color="#EA759A" />
                <Text>찜한목록</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("onsale")}>
              <View style={styles.viewShadow}>
                <View></View>
                <Ionicons name="cart" size={ScreenWidth / 5} color="#98ADFA" />
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
          <View style={styles.divider}></View>
        </View>
        <View
          style={{
            height: ScreenHeight / 2.5,
            backgroundColor: "#ffff",
          }}
        >
          <View style={styles.informView}>
            <Ionicons name="document-text-outline" size={24} color="black" />
            <Text style={{ fontSize: 18, padding: 15 }}>이용약관</Text>
          </View>
          <TouchableOpacity onPress={() => console.log("press")}>
            <View style={styles.informView}>
              <AntDesign name="profile" size={24} color="black" />
              <Text style={{ fontSize: 18, padding: 15 }}>
                내부정보관리규정
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.informView}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="black"
            />
            <Text style={{ fontSize: 18, padding: 15 }}>개인정보처리방침</Text>
          </View>
          <TouchableOpacity onPress={logout}>
            <View style={styles.informView}>
              <MaterialIcons name="logout" size={24} color="black" />
              <Text style={{ fontSize: 18, padding: 15 }}>로그아웃</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.informView}>
            <OtherSetting navigation={navigation} />
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
  fontStyle: {
    fontSize: 40,
    fontFamily: "DoHyeonRegular",
    marginLeft: 10,
  },
  title: {
    fontSize: ScreenHeight / 30,
    color: "#ffff",
    fontFamily: "OpenSansMedium",
  },
  mainTitle: {
    fontSize: ScreenHeight / 15,
    color: "#ffff",
    marginTop: ScreenHeight / 100,
    marginBottom: ScreenHeight / 20,
    fontFamily: "OpenSansMedium",
  },
  viewSquare: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10,
  },
  viewShadow: {
    width: ScreenHeight / 5.5,
    height: ScreenHeight / 5.5,
    padding: 10,
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
    marginLeft: ScreenWidth / 13,
  },
  divider: {
    borderBottomColor: "#d7d4d4",
    borderBottomWidth: 1,
    margin: ScreenHeight / 20,
  },
});
