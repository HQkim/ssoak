import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import React from "react";
import Filter from "../Templates/filter";

type Props = {
  navigation: any;
  route: object;
};

const { height: ScreenHeight } = Dimensions.get("window");
const { width: ScreenWidth } = Dimensions.get("window");

const FilterContainer = (props: Props) => {
  return (
    <ScrollView style={styles.filterContainer}>
      <Filter
        styles={{
          filterTemplate: styles.filterTemplate,
          resetContainer: styles.resetContainer,
          applyContainer: styles.applyContainer,
          resetText: styles.resetText,
          applyText: styles.applyText,
        }}
        navigation={props.navigation}
        route={props.route}
      />
    </ScrollView>
  );
};

export default FilterContainer;

const styles = StyleSheet.create({
  filterContainer: {
    height: "100%",
    backgroundColor: "#fff",
  },
  filterTemplate: {
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
  },
  resetContainer: {
    width: ScreenWidth * 0.4,
    borderRadius: ScreenWidth * 0.8,
    backgroundColor: "#A1A5AC",
    height: ScreenWidth * 0.15,
    justifyContent: "center",
    alignItems: "center",
  },
  applyContainer: {
    width: ScreenWidth * 0.4,
    borderRadius: ScreenWidth * 0.8,
    backgroundColor: "#0176B7",
    height: ScreenWidth * 0.15,
    justifyContent: "center",
    alignItems: "center",
  },
  resetText: {
    fontSize: ScreenWidth / 20,
    color: "white",
  },
  applyText: {
    fontSize: ScreenWidth / 20,
    color: "white",
  },
});
