import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
type Props = {};

const MainHeader = ({ styles, handleSearchClick }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={{ flex: 2 }} />
      <View style={{ flex: 6, alignItems: "center", justifyContent: "center" }}>
        <Text style={styles.main}>쏙</Text>
      </View>
      <View
        style={{
          flex: 2,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={handleSearchClick}>
          <Feather
            name="search"
            size={24}
            color="black"
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Fontisto
            name="bell"
            size={20}
            color="black"
            style={{ marginRight: 30 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({});
