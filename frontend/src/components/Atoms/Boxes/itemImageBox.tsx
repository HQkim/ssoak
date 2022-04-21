import { View, Image } from "react-native";
import React from "react";

type Props = {
  style: any;
};

const ItemImageBox = (props: Props) => {
  return (
    <Image
      source={require("../../../../assets/temp.jpg")}
      style={props.style}
    />
  );
};

export default ItemImageBox;
