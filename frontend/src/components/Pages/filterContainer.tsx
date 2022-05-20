import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import React from "react";
import Filter from "../Templates/filter";

type Props = {
  navigation: any;
  text: string;
  setItems: Function;
  route: object;
  form: any;
  setForm: Function;
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
        text={props.text}
        setItems={props.setItems}
        route={props.route}
        propForm={props.form}
        propSetForm={props.setForm}
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
    height: ScreenWidth * 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  applyContainer: {
    width: ScreenWidth * 0.4,
    borderRadius: ScreenWidth * 0.8,
    backgroundColor: "#0176B7",
    height: ScreenWidth * 0.1,
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
