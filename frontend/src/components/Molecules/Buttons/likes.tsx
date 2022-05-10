import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { likeItem } from "../../../apis/auctionApi";
import { cancelLikeItem } from "../../../apis/auctionApi";

type Props = {};

const Likes = ({ item }) => {
  const [heart, setHeart] = useState(true);
  const pressHeart = async (item) => {
    if (item.isLiked == true) {
      await cancelLikeItem(item.itemSeq);
      item.isLiked = false;
      setHeart(false);
    } else {
      await likeItem(item.itemSeq);
      item.isLiked = true;
      setHeart(true);
    }
  };

  return (
    <TouchableOpacity onPress={() => pressHeart(item)}>
      {item.isLiked === true ? (
        <Ionicons name="heart" size={24} color="#EA759A" />
      ) : (
        <Ionicons name="heart-outline" size={24} color="black" />
      )}
    </TouchableOpacity>
  );
};

export default Likes;

const styles = StyleSheet.create({});
