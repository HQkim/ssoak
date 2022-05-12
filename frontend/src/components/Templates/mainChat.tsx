import {
  Alert,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { getDatabase, get, ref, onValue, off, update } from "firebase/database";
import {
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import GeneralButtonWithoutText from "../Atoms/Buttons/generalButtonWithoutText";
import { AntDesign, Ionicons } from "@expo/vector-icons";
type Props = {};

const MainChat = ({ onBack, myData, selectedUser, userId }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    console.log(userId);
  }, [userId]);
  const renderMessages = useCallback(
    (msgs) => {
      //structure for chat library:
      // msg = {
      //   _id: '',
      //   user: {
      //     avatar:'',
      //     name: '',
      //     _id: ''
      //   }
      // }

      return msgs
        ? msgs.reverse().map((msg, index) => ({
            ...msg,
            _id: index,
            user: {
              _id:
                msg.sender === myData.userId
                  ? myData.userId
                  : selectedUser.userId,
              avatar:
                msg.sender === myData.userId
                  ? myData.avatar
                  : selectedUser.avatar,
              name:
                msg.sender === myData.userId
                  ? myData.userId
                  : selectedUser.userId,
            },
          }))
        : [];
    },
    [myData.avatar, myData.userId, selectedUser.avatar, selectedUser.userId],
  );

  const fetchMessages = useCallback(async () => {
    const database = getDatabase();

    const snapshot = await get(
      ref(database, `chatrooms/${selectedUser.chatroomId}`),
    );

    return snapshot.val();
  }, [selectedUser.chatroomId]);

  useEffect(() => {
    Platform.OS === "ios" && setOffset(40);

    //load old messages
    const loadData = async () => {
      const myChatroom = await fetchMessages();

      setMessages(renderMessages(myChatroom.messages));
    };

    loadData();

    // set chatroom change listener
    const database = getDatabase();
    const chatroomRef = ref(database, `chatrooms/${selectedUser.chatroomId}`);
    onValue(chatroomRef, (snapshot) => {
      const data = snapshot.val();
      setMessages(renderMessages(data.messages));
    });

    return () => {
      //remove chatroom listener
      off(chatroomRef);
    };
  }, [fetchMessages, renderMessages, selectedUser.chatroomId]);

  const onSend = useCallback(
    async (msg = []) => {
      //send the msg[0] to the other user
      console.log(msg);
      const database = getDatabase();

      //fetch fresh messages from server
      const currentChatroom = await fetchMessages();

      const lastMessages = currentChatroom.messages || [];

      update(ref(database, `chatrooms/${selectedUser.chatroomId}`), {
        messages: [
          ...lastMessages,
          {
            text: msg[0].text,
            sender: myData.userId,
            createdAt: new Date(),
          },
        ],
      });

      setMessages((prevMessages) => GiftedChat.append(prevMessages, msg));
    },
    [fetchMessages, myData.userId, selectedUser.chatroomId],
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#719DD7" }}>
        <View style={styles.actionBar}>
          <Pressable onPress={onBack}>
            <AntDesign
              name="left"
              size={24}
              color="black"
              style={{ marginLeft: 10 }}
            />
          </Pressable>
        </View>
        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={{
            _id: userId,
          }}
          bottomOffset={offset}
          messagesContainerStyle={{
            backgroundColor: "#719dd7",
          }}
          renderInputToolbar={(props) => (
            <InputToolbar {...props} containerStyle={styles.textArea} />
          )}
          renderSend={(props) => {
            return (
              <Send
                {...props}
                containerStyle={{
                  borderWidth: 0,
                  alignSelf: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="send-outline" size={24} color="black" />
              </Send>
            );
          }}
          scrollToBottom={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default MainChat;

const styles = StyleSheet.create({
  actionBar: {
    backgroundColor: "#719dd7",
    height: 50,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  textArea: {
    borderWidth: 1,
    borderTopColor: "black",
    borderTopWidth: 1,
    borderColor: "black",
    borderRadius: 9999,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    height: 40,
    paddingLeft: 8,
    paddingRight: 8,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },
});
