import { Text } from "react-native";
import React from "react";

type Props = {
  title: string;
  style: any;
};

const Typography = (props: Props) => {
  return <Text style={props.style}>{props.title}</Text>;
};

export default Typography;
