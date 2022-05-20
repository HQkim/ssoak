import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import NotSold from "../Templates/notSold";

type Props = {
  navigation: any;
  route: object;
};

const NotSoldContainer = ({ navigation, route }: Props) => {
  return <NotSold navigation={navigation} route={route} />;
};

export default NotSoldContainer;

const styles = StyleSheet.create({});
