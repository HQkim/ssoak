import { TouchableOpacity, Text, Alert } from "react-native";
import React from "react";

type Props = {};

const GeneralButton = ({ styles, text, onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.box}>
      {children}
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default GeneralButton;
