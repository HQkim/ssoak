import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import RadioButton from "../../Atoms/Buttons/radioButton";
import Typography from "../../Atoms/Typographies/typography";

type Props = {
  getSelectInformation: Function;
  navigation: any;
  route: object;
};
const { height: ScreenHeight } = Dimensions.get("window");
const { width: ScreenWidth } = Dimensions.get("window");

const Category = (props: Props) => {
  const [select1, setSelect1] = useState(false);
  const [select2, setSelect2] = useState(false);
  const [select3, setSelect3] = useState(false);
  const [select4, setSelect4] = useState(false);
  const [select5, setSelect5] = useState(false);
  const [select6, setSelect6] = useState(false);
  const [select7, setSelect7] = useState(false);
  const [select8, setSelect8] = useState(false);
  const [select9, setSelect9] = useState(false);
  const [select10, setSelect10] = useState(false);
  const [select11, setSelect11] = useState(false);
  const [select12, setSelect12] = useState(false);
  const [select13, setSelect13] = useState(false);
  const [select14, setSelect14] = useState(false);
  const [select15, setSelect15] = useState(false);
  const [select16, setSelect16] = useState(false);

  const onSelect = async (text) => {
    if (select1 == false && text == "디지털기기") {
      setSelect1(!select1);
      setSelect2(false);
      setSelect3(false);
      setSelect4(false);
      setSelect5(false);
      setSelect6(false);
      setSelect7(false);
      setSelect8(false);
      setSelect9(false);
      setSelect10(false);
      setSelect11(false);
      setSelect12(false);
      setSelect13(false);
      setSelect14(false);
      setSelect15(false);
      setSelect16(false);
      await props.getSelectInformation("디지털기기");
    } else if (select2 == false && text == "생활가전") {
      setSelect1(false);
      setSelect2(!select2);
      setSelect3(false);
      setSelect4(false);
      setSelect5(false);
      setSelect6(false);
      setSelect7(false);
      setSelect8(false);
      setSelect9(false);
      setSelect10(false);
      setSelect11(false);
      setSelect12(false);
      setSelect13(false);
      setSelect14(false);
      setSelect15(false);
      setSelect16(false);
      await props.getSelectInformation("생활가전");
    } else if (select3 == false && text == "가구/인테리어") {
      setSelect1(false);
      setSelect2(false);
      setSelect3(!select3);
      setSelect4(false);
      setSelect5(false);
      setSelect6(false);
      setSelect7(false);
      setSelect8(false);
      setSelect9(false);
      setSelect10(false);
      setSelect11(false);
      setSelect12(false);
      setSelect13(false);
      setSelect14(false);
      setSelect15(false);
      setSelect16(false);
      await props.getSelectInformation("가구/인테리어");
    } else if (select4 == false && text == "유아동") {
      setSelect1(false);
      setSelect2(false);
      setSelect3(false);
      setSelect4(!select4);
      setSelect5(false);
      setSelect6(false);
      setSelect7(false);
      setSelect8(false);
      setSelect9(false);
      setSelect10(false);
      setSelect11(false);
      setSelect12(false);
      setSelect13(false);
      setSelect14(false);
      setSelect15(false);
      setSelect16(false);
      await props.getSelectInformation("유아동");
    } else if (select5 == false && text == "생활/가공식품") {
      setSelect1(false);
      setSelect2(false);
      setSelect3(false);
      setSelect4(false);
      setSelect5(!select5);
      setSelect6(false);
      setSelect7(false);
      setSelect8(false);
      setSelect9(false);
      setSelect10(false);
      setSelect11(false);
      setSelect12(false);
      setSelect13(false);
      setSelect14(false);
      setSelect15(false);
      setSelect16(false);
      await props.getSelectInformation("생활/가공식품");
    } else if (select6 == false && text == "유아도서") {
      setSelect1(false);
      setSelect2(false);
      setSelect3(false);
      setSelect4(false);
      setSelect5(false);
      setSelect6(!select6);
      setSelect7(false);
      setSelect8(false);
      setSelect9(false);
      setSelect10(false);
      setSelect11(false);
      setSelect12(false);
      setSelect13(false);
      setSelect14(false);
      setSelect15(false);
      setSelect16(false);
      await props.getSelectInformation("유아도서");
    } else if (select7 == false && text == "스포츠/레져") {
      setSelect1(false);
      setSelect2(false);
      setSelect3(false);
      setSelect4(false);
      setSelect5(false);
      setSelect6(false);
      setSelect7(!select7);
      setSelect8(false);
      setSelect9(false);
      setSelect10(false);
      setSelect11(false);
      setSelect12(false);
      setSelect13(false);
      setSelect14(false);
      setSelect15(false);
      setSelect16(false);
      await props.getSelectInformation("스포츠/레져");
    } else if (select8 == false && text == "여성잡화") {
      setSelect1(false);
      setSelect2(false);
      setSelect3(false);
      setSelect4(false);
      setSelect5(false);
      setSelect6(false);
      setSelect7(false);
      setSelect8(!select8);
      setSelect9(false);
      setSelect10(false);
      setSelect11(false);
      setSelect12(false);
      setSelect13(false);
      setSelect14(false);
      setSelect15(false);
      setSelect16(false);
      await props.getSelectInformation("여성잡화");
    } else if (select9 == false && text == "여성의류") {
      setSelect1(false);
      setSelect2(false);
      setSelect3(false);
      setSelect4(false);
      setSelect5(false);
      setSelect6(false);
      setSelect7(false);
      setSelect8(false);
      setSelect9(!select9);
      setSelect10(false);
      setSelect11(false);
      setSelect12(false);
      setSelect13(false);
      setSelect14(false);
      setSelect15(false);
      setSelect16(false);
      await props.getSelectInformation("여성의류");
    } else if (select10 == false && text == "남성패션/잡화") {
      setSelect1(false);
      setSelect2(false);
      setSelect3(false);
      setSelect4(false);
      setSelect5(false);
      setSelect6(false);
      setSelect7(false);
      setSelect8(false);
      setSelect9(false);
      setSelect10(!select10);
      setSelect11(false);
      setSelect12(false);
      setSelect13(false);
      setSelect14(false);
      setSelect15(false);
      setSelect16(false);
      await props.getSelectInformation("남성패션/잡화");
    } else if (select11 == false && text == "게임/취미") {
      setSelect1(false);
      setSelect2(false);
      setSelect3(false);
      setSelect4(false);
      setSelect5(false);
      setSelect6(false);
      setSelect7(false);
      setSelect8(false);
      setSelect9(false);
      setSelect10(false);
      setSelect11(!select11);
      setSelect12(false);
      setSelect13(false);
      setSelect14(false);
      setSelect15(false);
      setSelect16(false);
      await props.getSelectInformation("게임/취미");
    } else if (select12 == false && text == "뷰티/미용") {
      setSelect1(false);
      setSelect2(false);
      setSelect3(false);
      setSelect4(false);
      setSelect5(false);
      setSelect6(false);
      setSelect7(false);
      setSelect8(false);
      setSelect9(false);
      setSelect10(false);
      setSelect11(false);
      setSelect12(!select12);
      setSelect13(false);
      setSelect14(false);
      setSelect15(false);
      setSelect16(false);
      await props.getSelectInformation("뷰티/미용");
    } else if (select13 == false && text == "반려동물용품") {
      setSelect1(false);
      setSelect2(false);
      setSelect3(false);
      setSelect4(false);
      setSelect5(false);
      setSelect6(false);
      setSelect7(false);
      setSelect8(false);
      setSelect9(false);
      setSelect10(false);
      setSelect11(false);
      setSelect12(false);
      setSelect13(!select13);
      setSelect14(false);
      setSelect15(false);
      setSelect16(false);
      await props.getSelectInformation("반려동물용품");
    } else if (select14 == false && text == "도서/티켓/음반") {
      setSelect1(false);
      setSelect2(false);
      setSelect3(false);
      setSelect4(false);
      setSelect5(false);
      setSelect6(false);
      setSelect7(false);
      setSelect8(false);
      setSelect9(false);
      setSelect10(false);
      setSelect11(false);
      setSelect12(false);
      setSelect13(false);
      setSelect14(!select14);
      setSelect15(false);
      setSelect16(false);
      await props.getSelectInformation("도서/티켓/음반");
    } else if (select15 == false && text == "식물") {
      setSelect1(false);
      setSelect2(false);
      setSelect3(false);
      setSelect4(false);
      setSelect5(false);
      setSelect6(false);
      setSelect7(false);
      setSelect8(false);
      setSelect9(false);
      setSelect10(false);
      setSelect11(false);
      setSelect12(false);
      setSelect13(false);
      setSelect14(false);
      setSelect15(!select15);
      setSelect16(false);
      await props.getSelectInformation("식물");
    } else if (select16 == false && text == "기타") {
      setSelect1(false);
      setSelect2(false);
      setSelect3(false);
      setSelect4(false);
      setSelect5(false);
      setSelect6(false);
      setSelect7(false);
      setSelect8(false);
      setSelect9(false);
      setSelect10(false);
      setSelect11(false);
      setSelect12(false);
      setSelect13(false);
      setSelect14(false);
      setSelect15(false);
      setSelect16(!select16);
      await props.getSelectInformation("기타");
    }
    // else if (
    //   select1 == false &&
    //   select2 == false &&
    //   select3 == false &&
    //   select4 == false &&
    //   select5 == false &&
    //   select6 == false &&
    //   select7 == false &&
    //   select8 == false &&
    //   select9 == false &&
    //   select10 == false &&
    //   select11 == false &&
    //   select12 == false &&
    //   select13 == false &&
    //   select14 == false &&
    //   select15 == false &&
    //   select16 == false
    // ) {
    //   await props.getSelectInformation("");
    // }
    else if (select1 == true && text == "디지털기기") {
      setSelect1(!select1);
      setSelect2(false);
      setSelect3(false);
      setSelect4(false);
      setSelect5(false);
      setSelect6(false);
      setSelect7(false);
      setSelect8(false);
      setSelect9(false);
      setSelect10(false);
      setSelect11(false);
      setSelect12(false);
      setSelect13(false);
      setSelect14(false);
      setSelect15(false);
      setSelect16(false);
      await props.getSelectInformation("");
    } else if (select2 == true && text == "생활가전") {
      setSelect1(false);
      setSelect2(!select2);
      setSelect3(false);
      setSelect4(false);
      setSelect5(false);
      setSelect6(false);
      setSelect7(false);
      setSelect8(false);
      setSelect9(false);
      setSelect10(false);
      setSelect11(false);
      setSelect12(false);
      setSelect13(false);
      setSelect14(false);
      setSelect15(false);
      setSelect16(false);
      await props.getSelectInformation("");
    } else if (select3 == true && text == "가구/인테리어") {
      setSelect1(false);
      setSelect2(false);
      setSelect3(!select3);
      setSelect4(false);
      setSelect5(false);
      setSelect6(false);
      setSelect7(false);
      setSelect8(false);
      setSelect9(false);
      setSelect10(false);
      setSelect11(false);
      setSelect12(false);
      setSelect13(false);
      setSelect14(false);
      setSelect15(false);
      setSelect16(false);
      await props.getSelectInformation("");
    } else if (select4 == true && text == "유아동") {
      setSelect1(false);
      setSelect2(false);
      setSelect3(false);
      setSelect4(!select4);
      setSelect5(false);
      setSelect6(false);
      setSelect7(false);
      setSelect8(false);
      setSelect9(false);
      setSelect10(false);
      setSelect11(false);
      setSelect12(false);
      setSelect13(false);
      setSelect14(false);
      setSelect15(false);
      setSelect16(false);
      await props.getSelectInformation("");
    } else if (select5 == true && text == "생활/가공식품") {
      setSelect1(false);
      setSelect2(false);
      setSelect3(false);
      setSelect4(false);
      setSelect5(!select5);
      setSelect6(false);
      setSelect7(false);
      setSelect8(false);
      setSelect9(false);
      setSelect10(false);
      setSelect11(false);
      setSelect12(false);
      setSelect13(false);
      setSelect14(false);
      setSelect15(false);
      setSelect16(false);
      await props.getSelectInformation("");
    } else if (select6 == true && text == "유아도서") {
      setSelect1(false);
      setSelect2(false);
      setSelect3(false);
      setSelect4(false);
      setSelect5(false);
      setSelect6(!select6);
      setSelect7(false);
      setSelect8(false);
      setSelect9(false);
      setSelect10(false);
      setSelect11(false);
      setSelect12(false);
      setSelect13(false);
      setSelect14(false);
      setSelect15(false);
      setSelect16(false);
      await props.getSelectInformation("");
    } else if (select7 == true && text == "스포츠/레져") {
      setSelect1(false);
      setSelect2(false);
      setSelect3(false);
      setSelect4(false);
      setSelect5(false);
      setSelect6(false);
      setSelect7(!select7);
      setSelect8(false);
      setSelect9(false);
      setSelect10(false);
      setSelect11(false);
      setSelect12(false);
      setSelect13(false);
      setSelect14(false);
      setSelect15(false);
      setSelect16(false);
      await props.getSelectInformation("");
    } else if (select8 == true && text == "여성잡화") {
      setSelect1(false);
      setSelect2(false);
      setSelect3(false);
      setSelect4(false);
      setSelect5(false);
      setSelect6(false);
      setSelect7(false);
      setSelect8(!select8);
      setSelect9(false);
      setSelect10(false);
      setSelect11(false);
      setSelect12(false);
      setSelect13(false);
      setSelect14(false);
      setSelect15(false);
      setSelect16(false);
      await props.getSelectInformation("");
    } else if (select9 == true && text == "여성의류") {
      setSelect1(false);
      setSelect2(false);
      setSelect3(false);
      setSelect4(false);
      setSelect5(false);
      setSelect6(false);
      setSelect7(false);
      setSelect8(false);
      setSelect9(!select9);
      setSelect10(false);
      setSelect11(false);
      setSelect12(false);
      setSelect13(false);
      setSelect14(false);
      setSelect15(false);
      setSelect16(false);
      await props.getSelectInformation("");
    } else if (select10 == true && text == "남성패션/잡화") {
      setSelect1(false);
      setSelect2(false);
      setSelect3(false);
      setSelect4(false);
      setSelect5(false);
      setSelect6(false);
      setSelect7(false);
      setSelect8(false);
      setSelect9(false);
      setSelect10(!select10);
      setSelect11(false);
      setSelect12(false);
      setSelect13(false);
      setSelect14(false);
      setSelect15(false);
      setSelect16(false);
      await props.getSelectInformation("");
    } else if (select11 == true && text == "게임/취미") {
      setSelect1(false);
      setSelect2(false);
      setSelect3(false);
      setSelect4(false);
      setSelect5(false);
      setSelect6(false);
      setSelect7(false);
      setSelect8(false);
      setSelect9(false);
      setSelect10(false);
      setSelect11(!select11);
      setSelect12(false);
      setSelect13(false);
      setSelect14(false);
      setSelect15(false);
      setSelect16(false);
      await props.getSelectInformation("");
    } else if (select12 == true && text == "뷰티/미용") {
      setSelect1(false);
      setSelect2(false);
      setSelect3(false);
      setSelect4(false);
      setSelect5(false);
      setSelect6(false);
      setSelect7(false);
      setSelect8(false);
      setSelect9(false);
      setSelect10(false);
      setSelect11(false);
      setSelect12(!select12);
      setSelect13(false);
      setSelect14(false);
      setSelect15(false);
      setSelect16(false);
      await props.getSelectInformation("");
    } else if (select13 == true && text == "반려동물용품") {
      setSelect1(false);
      setSelect2(false);
      setSelect3(false);
      setSelect4(false);
      setSelect5(false);
      setSelect6(false);
      setSelect7(false);
      setSelect8(false);
      setSelect9(false);
      setSelect10(false);
      setSelect11(false);
      setSelect12(false);
      setSelect13(!select13);
      setSelect14(false);
      setSelect15(false);
      setSelect16(false);
      await props.getSelectInformation("");
    } else if (select14 == true && text == "도서/티켓/음반") {
      setSelect1(false);
      setSelect2(false);
      setSelect3(false);
      setSelect4(false);
      setSelect5(false);
      setSelect6(false);
      setSelect7(false);
      setSelect8(false);
      setSelect9(false);
      setSelect10(false);
      setSelect11(false);
      setSelect12(false);
      setSelect13(false);
      setSelect14(!select14);
      setSelect15(false);
      setSelect16(false);
      await props.getSelectInformation("");
    } else if (select15 == true && text == "식물") {
      setSelect1(false);
      setSelect2(false);
      setSelect3(false);
      setSelect4(false);
      setSelect5(false);
      setSelect6(false);
      setSelect7(false);
      setSelect8(false);
      setSelect9(false);
      setSelect10(false);
      setSelect11(false);
      setSelect12(false);
      setSelect13(false);
      setSelect14(false);
      setSelect15(!select15);
      setSelect16(false);
      await props.getSelectInformation("");
    } else if (select16 == true && text == "기타") {
      setSelect1(false);
      setSelect2(false);
      setSelect3(false);
      setSelect4(false);
      setSelect5(false);
      setSelect6(false);
      setSelect7(false);
      setSelect8(false);
      setSelect9(false);
      setSelect10(false);
      setSelect11(false);
      setSelect12(false);
      setSelect13(false);
      setSelect14(false);
      setSelect15(false);
      setSelect16(!select16);
      await props.getSelectInformation("");
    } else if (
      select1 == false &&
      select2 == false &&
      select3 == false &&
      select4 == false &&
      select5 == false &&
      select6 == false &&
      select7 == false &&
      select8 == false &&
      select9 == false &&
      select10 == false &&
      select11 == false &&
      select12 == false &&
      select13 == false &&
      select14 == false &&
      select15 == false &&
      select16 == false
    ) {
      await props.getSelectInformation("");
    }
  };

  return (
    <View>
      <View style={{ height: ScreenHeight / 20 }}>
        <Text style={{ fontSize: ScreenHeight / 45 }}>카테고리</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => onSelect("디지털기기")}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {select1 ? <RadioButton /> : null}
          </View>
          <Typography title="디지털기기" style={styles.fontStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSelect("생활가전")}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {select2 ? <RadioButton /> : null}
          </View>
          <Typography title="생활가전" style={styles.fontStyle} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", marginTop: 30 }}>
        <TouchableOpacity
          onPress={() => onSelect("가구/인테리어")}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {select3 ? <RadioButton /> : null}
          </View>
          <Typography title="가구/인테리어" style={styles.fontStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSelect("유아동")}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {select4 ? <RadioButton /> : null}
          </View>
          <Typography title="유아동" style={styles.fontStyle} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", marginTop: 30 }}>
        <TouchableOpacity
          onPress={() => onSelect("생활/가공식품")}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {select5 ? <RadioButton /> : null}
          </View>
          <Typography title="생활/가공식품" style={styles.fontStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSelect("유아도서")}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {select6 ? <RadioButton /> : null}
          </View>
          <Typography title="유아도서" style={styles.fontStyle} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", marginTop: 30 }}>
        <TouchableOpacity
          onPress={() => onSelect("스포츠/레져")}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {select7 ? <RadioButton /> : null}
          </View>
          <Typography title="스포츠/레져" style={styles.fontStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSelect("여성잡화")}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {select8 ? <RadioButton /> : null}
          </View>
          <Typography title="여성잡화" style={styles.fontStyle} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", marginTop: 30 }}>
        <TouchableOpacity
          onPress={() => onSelect("여성의류")}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {select9 ? <RadioButton /> : null}
          </View>
          <Typography title="여성의류" style={styles.fontStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSelect("남성패션/잡화")}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {select10 ? <RadioButton /> : null}
          </View>
          <Typography title="남성패션/잡화" style={styles.fontStyle} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", marginTop: 30 }}>
        <TouchableOpacity
          onPress={() => onSelect("게임/취미")}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {select11 ? <RadioButton /> : null}
          </View>
          <Typography title="게임/취미" style={styles.fontStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSelect("뷰티/미용")}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {select12 ? <RadioButton /> : null}
          </View>
          <Typography title="뷰티/미용" style={styles.fontStyle} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", marginTop: 30 }}>
        <TouchableOpacity
          onPress={() => onSelect("반려동물용품")}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {select13 ? <RadioButton /> : null}
          </View>
          <Typography title="반려동물용품" style={styles.fontStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSelect("도서/티켓/음반")}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {select14 ? <RadioButton /> : null}
          </View>
          <Typography title="도서/티켓/음반" style={styles.fontStyle} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", marginTop: 30 }}>
        <TouchableOpacity
          onPress={() => onSelect("식물")}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {select15 ? <RadioButton /> : null}
          </View>
          <Typography title="식물" style={styles.fontStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSelect("기타")}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {select16 ? <RadioButton /> : null}
          </View>
          <Typography title="기타" style={styles.fontStyle} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderBottomColor: "#d7d4d4",
          borderBottomWidth: 1,
          marginTop: 10,
        }}
      ></View>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  radioButton: {
    height: ScreenHeight / 35,
    width: ScreenHeight / 35,
    borderRadius: ScreenHeight / 50,
    borderWidth: 1,
    borderColor: "#b8b4b4",
    alignItems: "center",
    justifyContent: "center",
  },
  fontStyle: {
    fontWeight: "300",
    marginLeft: ScreenHeight / 130,
    fontSize: ScreenHeight / 50,
  },
});
