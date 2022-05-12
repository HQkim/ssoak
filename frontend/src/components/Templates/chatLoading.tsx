import React from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { Swing } from "react-native-animated-spinkit";

const ChatLoading = () => {
  return (
    <View style={styles.container}>
      <Swing color="#719DD7" />
    </View>
  );
};
export default ChatLoading;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
