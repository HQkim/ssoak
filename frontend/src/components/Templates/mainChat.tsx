import { Alert, Platform, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GiftedChat, IMessage } from "react-native-gifted-chat";

type Props = {};

const MainChat = (props: Props) => {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    client.activate();
    Platform.OS === "ios" && setOffset(80);
  }, []);
  const client = new StompJs.Client({
    brokerURL: "ws://k6a207.p.ssafy.io:5000/api/v1/ws",
    connectHeaders: {
      Authorization:
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiYXV0aCI6IlJPTEVfTUVNQkVSIiwiZXhwIjoxNjUxNjQzNTUxfQ.hR77nGNtvz04M_F7tuGHF1FGUOVqw8ej843OyMQGOO722r9ROtrgw2eqGlMsTxfAA3241IppfoEWkn3HSmboPg",
    },
    debug: function (str) {
      console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });
  const [messages, setMessages] = useState<IMessage[]>([]);
  const onSend = useCallback((messages = []) => {
    setMessages((prev) => GiftedChat.append(prev, messages));
  }, []);
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "#719DD7" }}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: 1,
        }}
        bottomOffset={offset}
      />
    </View>
  );
};

export default MainChat;

const styles = StyleSheet.create({});
