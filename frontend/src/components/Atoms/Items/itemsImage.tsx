import { StyleSheet, Image } from "react-native";
import React from "react";

type Props = {};

const ItemsImage = ({ source, imageStyle }) => {
  return <Image source={source} style={imageStyle} />;
};

export default ItemsImage;

const styles = StyleSheet.create({});
