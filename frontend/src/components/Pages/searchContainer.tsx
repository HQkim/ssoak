import { StyleSheet, View } from "react-native";
import React from "react";
import Search from "../Templates/search";

type Props = {
  navigation: any;
};

const SearchContainer = ({ navigation }: Props) => {
  return (
    <View style={styles.searchContainer}>
      <Search style={styles.searchTemplate} navigation={navigation} />
    </View>
  );
};

export default SearchContainer;

const styles = StyleSheet.create({
  searchContainer: {
    height: "100%",
    backgroundColor: "#fff",
  },
  searchTemplate: {
    marginLeft: 20,
    marginRight: 20,
  },
});
