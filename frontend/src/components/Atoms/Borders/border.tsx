import { View } from "react-native";
import React from "react";

type Props = {
  style: any;
};

const Border = (props: Props) => {
  return <View style={props.style}></View>;
};

export default Border;
