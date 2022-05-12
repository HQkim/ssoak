import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import GeneralButtonWithoutText from "../../components/Atoms/Buttons/generalButtonWithoutText";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import NumberFormat from "react-number-format";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import GeneralButton from "../Atoms/Buttons/generalButton";
import {
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import {
  get,
  getDatabase,
  off,
  onValue,
  push,
  ref,
  set,
  update,
} from "firebase/database";
import { useNavigation } from "@react-navigation/native";
type Props = {};
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get("window");

const AuctionChat = ({ userId, userAvatar, item }) => {
  const [currentCost, setCurrentCost] = useState();
  const [bidRightNow, setBidRightNow] = useState<string>("15000");
  const [bidAssignValue, setBidAssignValue] = useState<string>("15000");
  const [chatText, setChatText] = useState<string>("");
  const [offset, setOffset] = useState(0);
  const [username, setUsername] = useState(null);
  const [users, setUsers] = useState([]);
  const [userToAdd, setUserToAdd] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [myData, setMyData] = useState<any>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [userData, setUserData] = useState([]);
  const giftedChatRef = useRef();
  const [itemId, setItemId] = useState(4);

  useEffect(() => {
    Platform.OS === "ios" && setOffset(50);
  }, []);

  useEffect(() => {
    setCurrentCost(item.startPrice);
  }, []);

  useEffect(() => {
    setBidRightNow(String((Number(currentCost) * 1.1).toFixed()));
  }, [currentCost]);

  useEffect(() => {
    console.log(currentCost, bidRightNow);
  }, [bidRightNow]);

  const [iskeyboardUp, setIsKeyboardUp] = useState(false);
  const navigation = useNavigation();
  const findUser = async () => {
    const database = getDatabase();
    const mySnapshot = await get(ref(database, `users/${userId}`));
    return mySnapshot.val();
  };
  const onLogin = async () => {
    try {
      const database = getDatabase();
      const user = await findUser();
      if (user) {
        setMyData(user);
      } else {
        const newUserObj = {
          userId: userId,
          avatar: userAvatar,
        };
        set(ref(database, `users/${userId}`), newUserObj);
        setMyData(newUserObj);
      }

      // set chatroom list change listener
      const myUserRef = ref(database, `users/${userId}`);

      const auctionChatroom = await get(
        ref(database, `auctionChatrooms/${itemId}`),
      );
      if (!auctionChatroom) {
        set(ref(database, `auctionChatrooms/${itemId}`), {
          itemId: itemId,
          messages: [],
        });
      }

      const auctionChatRef = ref(database, `auctionChatrooms/${itemId}`);
      onValue(auctionChatRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setMessages(renderMessages(data.messages));
        }
      });

      onValue(myUserRef, (snapshot) => {
        const data = snapshot.val();
        setUsers(data?.friends);
        setMyData((prevData) => ({
          ...prevData,
          friends: data?.friends,
        }));
      });
    } catch (error) {
      navigation.navigate("main");
    }
  };
  useEffect(() => {
    const database = getDatabase();
    get(ref(database, "users")).then((res) => {
      setUserData(res);
    });
  }, [userId]);

  useEffect(() => {
    if (userId && userData) {
      onLogin();
    }
  }, [userData]);

  useEffect(() => {
    Keyboard.addListener("keyboardWillShow", () => {
      setIsKeyboardUp(true);
    });
    Keyboard.addListener("keyboardWillHide", () => {
      setIsKeyboardUp(false);
    });

    return () => setIsKeyboardUp(false);
  }, []);

  const handlebidRightNow = () => {
    Alert.alert(
      "즉시 입찰",
      `입찰가 : ${bidRightNow}원에 \n 즉시 입찰하시겠습니까?`,
      [
        {
          text: "예",
          onPress: () => {
            if (giftedChatRef) {
              onSend([
                {
                  _id: `${new Date()}${userId}${bidRightNow}`,
                  createdAt: new Date(),
                  user: {
                    _id: userId,
                  },
                  type: "bid",
                  price: `${bidRightNow}`,
                  text: `${bidRightNow}원에 입찰했습니다.`,
                },
              ]);
            }
          },
        },
        {
          text: "아니오",
          onPress: () => {},
        },
      ],
    );
  };

  const fetchMessages = useCallback(async () => {
    const database = getDatabase();

    const snapshot = await get(ref(database, `auctionChatrooms/${itemId}`));

    return snapshot.val();
  }, [itemId]);

  const onSend = useCallback(
    async (msg = []) => {
      //send the msg[0] to the other user
      if (!msg[0].type) {
        msg[0].type = "text";
      }
      const database = getDatabase();

      //fetch fresh messages from server
      const currentChatroom = await fetchMessages();
      const lastMessages = currentChatroom?.messages || [];

      update(ref(database, `auctionChatrooms/${itemId}`), {
        messages: [
          ...lastMessages,
          {
            text: msg[0].text,
            sender: msg[0].user._id,
            createdAt: new Date(),
            type: msg[0].type,
            price: msg[0].price ? msg[0].price : "",
          },
        ],
      });

      setMessages((prevMessages) => GiftedChat.append(prevMessages, msg));
    },
    [fetchMessages, myData?.userId, itemId],
  );

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
      if (msgs[msgs.length - 1].type === "bid") {
        console.log(msgs[msgs.length - 1]);
        setCurrentCost(msgs[msgs.length - 1].price);
      }

      return msgs
        ? msgs.reverse().map((msg, index) => ({
            ...msg,
            _id: index,
            user: {
              _id: msg.sender === myData?.userId ? myData.userId : msg.sender,
              avatar:
                msg.sender === myData?.userId ? myData.avatar : msg.sender,
              name: msg.sender === myData?.userId ? myData.userId : msg.sender,
            },
            type: msg.type,
          }))
        : [];
    },
    [myData?.avatar, myData?.userId, itemId, messages],
  );
  useEffect(() => {
    Platform.OS === "ios" && setOffset(40);

    //load old messages
    const loadData = async () => {
      const myChatroom = await fetchMessages();

      myChatroom && setMessages(renderMessages(myChatroom.messages));
    };

    loadData();

    // set chatroom change listener
    const database = getDatabase();
    const chatroomRef = ref(database, `auctionChatrooms/${itemId}`);
    onValue(chatroomRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMessages(renderMessages(data.messages));
      }
    });

    return () => {
      //remove chatroom listener
      off(chatroomRef);
    };
  }, [fetchMessages, itemId]);
  const handleOnchangebidRightNow = (e: any) => {
    setBidRightNow(e.nativeEvent.text);
  };

  const handleOnchangebidAssignValue = (e: any) => {
    setBidAssignValue(e.nativeEvent.text);
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        showAvatarForEveryMessage={false}
        showUserAvatar={false}
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
      {iskeyboardUp === false && (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            onPress={handlebidRightNow}
            style={styles.bidButton}
          >
            <Text style={styles.bidText}>{bidRightNow}원</Text>
            <Text style={styles.bidText}>즉시 입찰</Text>
          </TouchableOpacity>
        </View>
      )}
      {Platform.OS === "android" && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
};

export default AuctionChat;

const styles = StyleSheet.create({
  box: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
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
  bidButton: {
    height: ScreenHeight / 10,
    width: ScreenHeight / 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#719DD7",
  },
  bidText: {
    color: "white",
  },
});
