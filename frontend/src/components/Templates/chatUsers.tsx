import React from "react";
import {
  Button,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  Text,
  SafeAreaView,
} from "react-native";

const ChatUsers = ({
  users,
  onClickUser,
  userToAdd,
  setUserToAdd,
  // onAddFriend,
}) => {
  const renderUser = ({ item }) => {
    return (
      <Pressable onPress={() => onClickUser(item)} style={styles.row}>
        <View style={{}}>
          <Image style={styles.avatar} source={{ uri: item.avatar }} />
        </View>
        <Text numberOfLines={1}>{item?.title}</Text>
      </Pressable>
    );
  };
  return (
    <>
      <SafeAreaView>
        <FlatList
          data={users}
          renderItem={renderUser}
          keyExtractor={(item) => item?.userId.toString()}
        />
      </SafeAreaView>
    </>
  );
};

export default ChatUsers;

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 9999,
    borderWidth: 0.5,
  },
  row: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    borderBottomColor: "#cacaca",
    borderBottomWidth: 1,
  },
  addUser: {
    flexDirection: "row",
    padding: 10,
  },
  input: {
    backgroundColor: "#cacaca",
    flex: 1,
    marginRight: 10,
    padding: 10,
  },
});
