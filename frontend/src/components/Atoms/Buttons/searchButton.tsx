import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
type Props = {
  onPress: () => void;
  size: number;
};

const SearchButton = (props: Props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <AntDesign name="search1" size={props.size} color="black" />
    </TouchableOpacity>
  );
};

export default SearchButton;

const styles = StyleSheet.create({});
