import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

type Props = {};

const ChatListContainer = ({ navigation }) => {
  const handleChatClick = () => {
    navigation.navigate("chat");
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ height: 80 }}>
          <Text>asd</Text>
        </View>
        <View style={{ height: 80 }}>
          <Text>asd</Text>
        </View>
        <View style={{ height: 80 }}>
          <Text>asd</Text>
        </View>
        <View style={{ height: 80 }}>
          <Text>asd</Text>
        </View>
        <TouchableOpacity onPress={handleChatClick} style={{ height: 80 }}>
          <Text>asdasdas</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatListContainer;

const styles = StyleSheet.create({});
