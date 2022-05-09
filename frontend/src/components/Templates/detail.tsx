import { StyleSheet, Dimensions } from "react-native";
import React, { useEffect } from "react";
import Description from "../Molecules/Description";

type Props = {};

const detail = ({ item }) => {
  return (
    <Description
      item={item}
      descStyle={styles.description}
      titleStyle={styles.title}
    />
  );
};

export default detail;

const styles = StyleSheet.create({
  description: {
    color: "#444444",
    fontSize: 20,
    marginLeft: Dimensions.get("window").height / 50,
    marginRight: Dimensions.get("window").height / 50,
  },
  title: {
    fontSize: 30,
    marginLeft: Dimensions.get("window").height / 50,
  },
});
