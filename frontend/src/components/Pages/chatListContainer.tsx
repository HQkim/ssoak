import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {};

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");
const ChatListContainer = ({ navigation }) => {
  const [chatList, setChatList] = useState<object[]>([]);
  const handleChatClick = () => {
    navigation.navigate("chat");
  };
  useEffect(() => {
    console.log(AsyncStorage.getItem("accessToken"));
  }, []);
  return (
    <SafeAreaView>
      <ScrollView style={{ height: "100%" }}>
        <TouchableOpacity
          onPress={handleChatClick}
          style={{
            height: ScreenHeight / 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              marginLeft: 10,
              marginRight: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: "https://picsum.photos/200" }}
              style={{
                width: ScreenWidth / 10,
                height: ScreenWidth / 10,
                borderRadius: 9999,
                borderWidth: 1,
              }}
            />
          </View>
          <View
            style={{
              paddingLeft: 10,
              justifyContent: "space-around",
              height: "50%",
              paddingRight: 10,
              width: "75%",
            }}
          >
            <Text style={{ fontSize: 20 }}>TestUser01</Text>
            <Text numberOfLines={1}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus
              dolore provident, tempore totam id deserunt distinctio libero a
              modi quae. Nobis, suscipit.
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleChatClick}
          style={{
            height: ScreenHeight / 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              marginLeft: 10,
              marginRight: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: "https://picsum.photos/200" }}
              style={{
                width: ScreenWidth / 10,
                height: ScreenWidth / 10,
                borderRadius: 9999,
                borderWidth: 1,
              }}
            />
          </View>
          <View
            style={{
              paddingLeft: 10,
              justifyContent: "space-around",
              height: "50%",
              paddingRight: 10,
              width: "75%",
            }}
          >
            <Text style={{ fontSize: 20 }}>TestUser01</Text>
            <Text numberOfLines={1}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus
              dolore provident, tempore totam id deserunt distinctio libero a
              modi quae. Nobis, suscipit.
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatListContainer;

const styles = StyleSheet.create({});
