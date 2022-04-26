import { TouchableOpacity, Text, Alert } from "react-native";
import React from "react";

type Props = {};

const bidButton = ({ styles, text, onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.bidButton}>
      {children}
      <Text style={styles.bidText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default bidButton;
