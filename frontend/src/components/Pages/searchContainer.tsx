import { StyleSheet, View, ScrollView } from "react-native";
import React, { useEffect } from "react";
import Search from "../Templates/search";

type Props = {
  navigation: any;
  text: string;
  setText: any;
  items: any;
};

const SearchContainer = ({ navigation, text, items }: Props) => {
  useEffect(() => {
    console.log(items.length);
  }, [items]);
  return (
    <ScrollView style={styles.searchContainer}>
      <Search
        style={styles.searchTemplate}
        navigation={navigation}
        text={text}
        items={items}
      />
    </ScrollView>
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
