import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  likeItem,
  cancelLikeItem,
  deleteAuction,
} from "../../../apis/auctionApi";
import jwt_decode, { JwtPayload } from "jwt-decode";

const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get("window");

const UpdateButton = ({ item, reqItem }) => {
  const [isLiked, setIsLiked] = useState(item.isLike);
  const navigation: any = useNavigation();
  const [select, setSelect] = useState(false);
  const [token, setToken] = useState<any>();

  const getToken = async () => {
    const tokenSeq: string = await AsyncStorage.getItem("accessToken");
    const decodedToken = jwt_decode<JwtPayload>(tokenSeq);
    const myToken = Number(decodedToken.sub);
    setToken(myToken);
  };

  const onSelect = () => {
    setSelect(!select);
  };

  useEffect(() => {
    getToken();
  }, []);

  const onUpdate = () => {
    navigation.navigate("itemModification", {
      params: item,
      reqItem: reqItem,
    });
  };

  const ondelete = async (itemSeq: number) => {
    const result = await deleteAuction(itemSeq);
    if (result.status === 204) {
      navigation.navigate("main");
    }
  };

  const onClickHeart = async (reqItemNumber: number) => {
    setIsLiked(!isLiked);
    if (isLiked === true) {
      const result = await cancelLikeItem(reqItemNumber);
    } else {
      const result = await likeItem(reqItemNumber);
    }
  };
  return (
    <View>
      {token === undefined ? null : item.seller.seq === token ? (
        <AntDesign
          name="ellipsis1"
          size={24}
          color="black"
          style={styles.dropdown}
          onPress={onSelect}
        />
      ) : isLiked ? (
        <Ionicons
          name={"heart"}
          size={ScreenWidth / 9}
          color={"#EA759A"}
          onPress={() => onClickHeart(reqItem)}
        />
      ) : (
        <Ionicons
          name={"heart-outline"}
          size={ScreenWidth / 9}
          color={"#EA759A"}
          onPress={() => onClickHeart(reqItem)}
        />
      )}

      {select ? (
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownStyle} onPress={onUpdate}>
            <Ionicons name="pencil" size={20} color="black" />
            수정하기
          </Text>
          <Text style={styles.dropdownStyle} onPress={() => ondelete(reqItem)}>
            <Ionicons name="trash-outline" size={20} color="black" />
            삭제하기
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default UpdateButton;

const styles = StyleSheet.create({
  dropdown: {
    justifyContent: "center",
    marginHorizontal: ScreenWidth / 16,
  },
  dropdownContainer: {
    position: "absolute",
    right: 50,
    top: -23,
  },
  dropdownStyle: {
    backgroundColor: "#ffffffae",
    width: 100,
    height: 35,
    padding: 5,
    fontSize: 15,
    textAlign: "center",
  },
});
