import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import { Feather } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
type Props = {};

const MainHeader = ({ styles, handleSearchClick }) => {
  const [font, setFont] = useState(false);
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        DoHyeonRegular: require("../../../../assets/fonts/DoHyeon-Regular.ttf"),
      });
      setFont(true);
    }
    loadFonts();
  }, []);
  return (
    <View style={styles.mainContainer}>
      <View style={{ flex: 2 }} />
      <View style={{ flex: 6, alignItems: "center", justifyContent: "center" }}>
        {font && <Text style={styles.main}>쏙</Text>}
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
