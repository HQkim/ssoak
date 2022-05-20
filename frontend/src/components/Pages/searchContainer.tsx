import { StyleSheet, View, ScrollView } from "react-native";
import React, { useEffect } from "react";
import Search from "../Templates/search";

type Props = {
  navigation: any;
  text: string;
  setText: any;
  items: any;
  form: any;
  setForm: Function;
};

const SearchContainer = ({ navigation, text, items, form, setForm }: Props) => {
  return (
    <View style={styles.searchContainer}>
      <Search
        style={styles.searchTemplate}
        navigation={navigation}
        text={text}
        items={items}
        form={form}
        setForm={setForm}
      />
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
    height: "100%",
  },
});
