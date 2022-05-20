import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useFocusEffect } from "@react-navigation/native";

const { height: ScreenHeight } = Dimensions.get("window");

const DropDown = ({ getSelectInformation, itemCategory }) => {
  const [defaultValue, setDefaultValue] = useState(itemCategory);

  const onClickCategory = (category) => {
    getSelectInformation(category);
  };
  useFocusEffect(
    React.useCallback(() => {
      setDefaultValue(itemCategory);
    }, [])
  );

  return (
    <DropDownPicker
      items={[
        { label: "디지털기기", value: "디지털기기" },
        { label: "생활가전", value: "생활가전" },
        { label: "가구/인테리어", value: "가구/인테리어" },
        { label: "유아동", value: "유아동" },
        { label: "유아도서", value: "유아도서" },
        { label: "생활/가공식품", value: "생활/가공식품" },
        { label: "스포츠/레저", value: "스포츠/레저" },
        { label: "여성의류", value: "여성의류" },
        { label: "여성잡화", value: "여성잡화" },
        { label: "남성패션/잡화", value: "남성패션/잡화" },
        { label: "게임/취미", value: "게임/취미" },
        { label: "뷰티/미용", value: "뷰티/미용" },
        { label: "반려동물용품", value: "반려동물용품" },
        { label: "도서/티켓/음반", value: "도서/티켓/음반" },
        { label: "식물", value: "식물" },
        { label: "기타", value: "기타" },
      ]}
      containerStyle={{
        height: ScreenHeight / 15,
        marginTop: ScreenHeight / 100,
      }}
      defaultIndex={defaultValue}
      placeholder="카테고리"
      onChangeItem={(item) => onClickCategory(item.value)}
    />
  );
};
export default DropDown;
