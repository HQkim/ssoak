import { TouchableOpacity } from "react-native";
import React from "react";
import Divider from "react-native-divider";
type Props = {};

const MoreButton = ({ handleMoreClick, style, showMore }) => {
  return (
    <TouchableOpacity onPress={handleMoreClick} style={style}>
      <Divider orientation="center" borderColor="#aaaaaa">
        {showMore ? "숨기기" : "더 보기"}
      </Divider>
    </TouchableOpacity>
  );
};

export default MoreButton;
