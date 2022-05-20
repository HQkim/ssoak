import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

type Props = {};

const GeneralButtonWithoutText = ({ children, styles, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.box}>
      {children}
    </TouchableOpacity>
  );
};

export default GeneralButtonWithoutText;
