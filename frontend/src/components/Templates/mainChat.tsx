import { Alert, Platform, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import * as StompJs from "@stomp/stompjs";

type Props = {};

const MainChat = (props: Props) => {
  const [connected, setConnected] = useState(false);
  console.log(navigator);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    Platform.OS === "ios" && setOffset(80);
  }, []);
  let client: any = null;

  const subscribe = () => {
    if (client !== null) {
      client.subscribe("/topic/1_1", (data) => {
        const parsed = new TextDecoder().decode(data._binaryBody);
        console.log(parsed);
      });
      client.subscribe("/topic/1", (data) => {
        const parsed = new TextDecoder().decode(data._binaryBody);
        console.log(parsed);
      });
    }
  };

  const connect = () => {
    client = new StompJs.Client({
      brokerURL: "ws://k6a207.p.ssafy.io:5000/api/v1/ws",
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000, //자동 재 연결
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = function (frame) {
      subscribe();
      setConnected(true);
      // console.log(frame, "onConnected");
    };

    client.onStompError = function (frame) {
      console.log(frame, "StompError");
    };

    client.activate();
  };

  const disconnect = () => {
    if (client != null) {
      if (client.connected) client.deactivate();
    }
  };
  const [messages, setMessages] = useState<IMessage[]>([]);
  const onSend = useCallback((messages = []) => {
    // console.log(client, connected, messages);
    console.log(messages);
    if (client != null) {
      if (!connected) return;
      client.publish({
        destination: "/pub/live_auction",
        body: JSON.stringify({
          ...messages[0],
        }),
      });
    }
    setMessages((prev) => GiftedChat.append(prev, messages));
  }, []);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  useEffect(() => {
    console.log(connected);
  }, [connected]);
  useEffect(() => {
    connect();
    setMessages([
      {
        _id: 1,
        itemSeq: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
        type: 1,
      },
    ]);
    return () => disconnect();
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
