import { StyleSheet, TextInput } from "react-native";
import React from "react";

type Props = {};

const ItemTextInput = ({ value, textAlign, maxLength, textInputStyle }) => {
  return (
    <TextInput
      style={textInputStyle}
      editable={false}
      maxLength={maxLength}
      textAlign={textAlign}
      value={value}
    />
  );
};

export default ItemTextInput;

const styles = StyleSheet.create({});
