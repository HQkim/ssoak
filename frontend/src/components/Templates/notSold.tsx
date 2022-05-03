import { StyleSheet, ScrollView } from "react-native";
import React from "react";
import ItemList from "../Organisms/ItemList";

type Props = {};

const NotSold = ({ items }) => {
  return (
    <ScrollView style={{ backgroundColor: "#fff", height: "100%" }}>
      <ItemList items={items} containerStyle={styles.container} />
    </ScrollView>
  );
};

export default NotSold;

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#fff",
  },
});
