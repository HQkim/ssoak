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
import React, { useEffect, useRef, useState } from "react";
import GeneralButtonWithoutText from "../../components/Atoms/Buttons/generalButtonWithoutText";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import NumberFormat from "react-number-format";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import GeneralButton from "../Atoms/Buttons/generalButton";
import { GiftedChat, InputToolbar } from "react-native-gifted-chat";
type Props = {};
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get("window");

const AuctionChat = (props: Props) => {
  const [currentCost, setCurrentCost] = useState("15000");
  const [bidRightNow, setBidRightNow] = useState<string>("15000");
  const [bidAssignValue, setBidAssignValue] = useState<string>("15000");
  const [chatText, setChatText] = useState<string>("");
  const [iskeyboardUp, setIsKeyboardUp] = useState(false);
  const handleOnChangeText = (e: string) => {
    setChatText(e);
  };

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
          onPress: () => {},
        },
        {
          text: "아니오",
          onPress: () => {},
        },
      ]
    );
  };

  const handleOnchangebidRightNow = (e: any) => {
    setBidRightNow(e.nativeEvent.text);
  };

  const handleOnchangebidAssignValue = (e: any) => {
    setBidAssignValue(e.nativeEvent.text);
  };

  const handleSendText = () => {
    try {
      Alert.alert(chatText);
    } catch {
      console.log();
    } finally {
      setChatText("");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        // messages={chatText}
        // onSend={(messages) => onSend(messages)}
        onInputTextChanged={handleOnChangeText}
        messagesContainerStyle={{
          backgroundColor: "#0176B7",
        }}
        renderActions={(props) => (
          <GeneralButtonWithoutText styles={styles} onPress={() => {}}>
            <AntDesign name="pluscircleo" size={24} color="black" />
          </GeneralButtonWithoutText>
        )}
        renderInputToolbar={(props) => (
          <InputToolbar {...props} containerStyle={styles.textArea} />
        )}
        textInputProps={{ value: chatText }}
        user={{
          _id: 1,
        }}
        renderSend={() => {
          return (
            <GeneralButtonWithoutText styles={styles} onPress={handleSendText}>
              <Ionicons name="send-outline" size={24} color="black" />
            </GeneralButtonWithoutText>
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
