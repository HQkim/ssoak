import { Alert, Platform, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import * as StompJs from "@stomp/stompjs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
type Props = {};

const MainChat = (props: Props) => {
  let socket: any, cl: any;
  console.log(navigator);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    Platform.OS === "ios" && setOffset(80);
  }, []);

  useEffect(() => {}, []);

  const connect = () => {
    socket = new SockJS("http://k6a207.p.ssafy.io:5000/api/v1/ws");
    cl = Stomp.over(socket);
    cl.connect({}, function (frame) {
      console.log(frame, "!!!");
      cl.subscribe(
        "/pub/topic/1",
        (e) => {
          console.log(e, "@@");
          console.log(JSON.parse(e.body), "@@");
        },
        (error) => {
          console.log(error);
        },
      );
      cl.send(
        "/chat",
        {},
        JSON.stringify({
          itemSeq: 1,
          sellerSeq: 1,
          buyerSeq: 2,
          content: "haha",
        }),
      );
    });
    cl.debug = function (e) {
      console.log(e, "!!");
    };
  };
  connect();

  // const send = () => {
  const data = {
    itemSeq: 1,
    sellerSeq: 1,
    buyerSeq: 2,
    content: "haha",
  };
  //   cl.send("/chat", {}, JSON.stringify(data));
  // };
  // send();
  // const client = new StompJs.Client({
  //   brokerURL: "ws://k6a207.p.ssafy.io:5000/api/v1/ws",
  //   // connectHeaders: {
  //   //   Authorization:
  //   //     "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiYXV0aCI6IlJPTEVfTUVNQkVSIiwiZXhwIjoxNjUxNjQzNTUxfQ.hR77nGNtvz04M_F7tuGHF1FGUOVqw8ej843OyMQGOO722r9ROtrgw2eqGlMsTxfAA3241IppfoEWkn3HSmboPg",
  //   // },
  //   debug: function (str) {
  //     console.log(str);
  //   },
  //   reconnectDelay: 5000,
  //   heartbeatIncoming: 4000,
  //   heartbeatOutgoing: 4000,
  //   onConnect: function (frame) {
  //     console.log(frame, "connected");
  //   },
  // });

  // console.log(client);

  // client.onConnect = function (frame) {
  //   console.log("connected");
  // };

  // client.onStompError = function (frame) {
  //   console.log(frame, "On Error");
  // };

  // client.activate();
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
