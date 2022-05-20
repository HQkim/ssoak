import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import Sold from "../Templates/sold";

type Props = {
  navigation: any;
  route: object;
};

const SoldContainer = ({ navigation, route }: Props) => {
  return <Sold navigation={navigation} route={route} />;
};

export default SoldContainer;

const styles = StyleSheet.create({});
