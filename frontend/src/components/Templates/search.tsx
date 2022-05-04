import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  style: object;
  navigation: any;
};

const Search = (props: Props) => {
  return (
    <View style={props.style}>
      <TouchableOpacity onPress={() => props.navigation.navigate("filter")}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons
            name="filter-variant"
            size={34}
            color="black"
          />
          <Text style={{ marginLeft: 10 }}>검색필터</Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          borderBottomColor: "#d7d4d4",
          borderBottomWidth: 1,
          marginTop: 5,
        }}
      ></View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
