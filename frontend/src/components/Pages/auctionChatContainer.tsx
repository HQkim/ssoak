import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AuctionChat from "../Templates/auctionChat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { kakaoProfile } from "../../apis/auth";
import { detailAuction } from "../../apis/auctionApi";
type Props = {};

const AuctionChatContainer = (props: any) => {
  const [userId, setUserId] = useState<any>(null);
  const [userAvatar, setUserAvatar] = useState(null);
  const [user, setUser] = useState(null);
  const [item, setItem] = useState();
  const getToken = async () => {
    const token = await AsyncStorage.getItem(
      "accessToken",
      async (err, res: any) => {
        await kakaoProfile().then((res) => {
          setUserAvatar(res.data.profileImageUrl);
          setUserId(res.data.seq);
          setUser(res.data);
        });
      },
    );
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <>
      {user && (
        <AuctionChat
          user={user}
          userId={userId}
          userAvatar={userAvatar}
          item={props.route.params.item}
        />
      )}
    </>
  );
  // return <></>;
};

export default AuctionChatContainer;

const styles = StyleSheet.create({});
