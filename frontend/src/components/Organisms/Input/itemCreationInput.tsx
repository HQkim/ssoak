import { View, StyleSheet, Dimensions, TextInput, Text } from "react-native";
import React, { useState, useEffect } from "react";
import Border from "../../Atoms/Borders/border";
import RadioButton from "../../Molecules/Buttons/radioButton";
import DropDown from "../../Molecules/Buttons/dropDown";
import ImageContainer from "../../Molecules/Images/imageContainer";
import DateTime from "../../Molecules/Times/dateTime";

const { height: ScreenHeight } = Dimensions.get("window");

// 사진 데이터, 카테고리, 경매 타입 날리기
type Props = {
  inputForm: Function;
  navigation: any;
  route: object;
  onSubmit: Function;
};

const ItemCreationInput = (props: Props) => {
  interface Form {
    title: string;
    startPrice: number;
    content: string;
    categories: string;
    auctionType: string;
  }
  const [form, setForm] = useState<Form | null | any>([]);

  const { title, startPrice, content, categories, actionType } = form;

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      setForm({
        title: "",
        startPrice: "",
        content: "",
        categories: "",
        actionType: "",
      });
    });
    return unsubscribe;
  }, [props.navigation]);

  const [select, setSelect] = useState(true);
  const onSelect = (info: boolean | string) => {
    props.onSubmit(console.warn(3));
    if (typeof info === "boolean") {
      setSelect(info);
      if (info === true) {
        setForm((prevState: any) => ({
          form: { ...prevState.form, auctionType: "NORMAL" },
        }));
      } else {
        setForm((prevState: any) => ({
          form: { ...prevState.form, auctionType: "LIVE_NORMAL" },
        }));
      }
    }
    if (typeof info === "string") {
      setForm((prevState: any) => ({
        form: { ...prevState.form, categories: info },
      }));
    }
  };
  const onChangeInput = (item: string, value: any) => {
    if (item === "title") {
      setForm((prevState: any) => ({
        form: { ...prevState.form, title: value },
      }));
    }
    if (item === "startPrice") {
      setForm((prevState: any) => ({
        form: { ...prevState.form, startPrice: value },
      }));
    }
    if (item === "content") {
      setForm((prevState: any) => ({
        form: { ...prevState.form, content: value },
      }));
    }
  };
  props.inputForm(form);
  return (
    <View>
      <ImageContainer navigation={props.navigation} route={props.route} />
      <RadioButton
        getSelectInformation={onSelect}
        navigation={props.navigation}
        route={props.route}
      />
      <DropDown getSelectInformation={onSelect} />
      <TextInput
        placeholder={"글 제목"}
        value={title}
        style={styles.textContainer}
        maxLength={20}
        keyboardType="default"
        multiline={false}
        onChangeText={(text) => onChangeInput("title", text)}
      ></TextInput>
      <Border style={styles.border} />
      <TextInput
        placeholder={"시초가"}
        value={startPrice}
        style={styles.textContainer}
        maxLength={7}
        keyboardType="numeric"
        multiline={false}
        onChangeText={(text) => onChangeInput("startPrice", text)}
      ></TextInput>
      <Border style={styles.border} />
      <View style={{ padding: ScreenHeight / 50 }}>
        <Text
          style={{
            fontWeight: "200",
            fontSize: ScreenHeight / 45,
          }}
        >
          {select ? "경매 시작 날짜" : "경매 종료 날짜"}
        </Text>
        <DateTime />
      </View>
      <Border style={styles.border} />
      <TextInput
        placeholder={"상품 상세 설명"}
        value={content}
        style={styles.descriptionContainer}
        maxLength={250}
        keyboardType="default"
        multiline={true}
        onChangeText={(text) => onChangeInput("content", text)}
      ></TextInput>
      <Border style={styles.border} />
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    fontSize: ScreenHeight / 40,
    fontWeight: "200",
    height: ScreenHeight / 15,
    padding: ScreenHeight / 50,
  },
  descriptionContainer: {
    fontSize: ScreenHeight / 40,
    fontWeight: "200",
    height: ScreenHeight / 4,
    marginTop: ScreenHeight / 100,
    padding: ScreenHeight / 50,
  },
  border: {
    borderBottomWidth: 1,
    borderColor: "#d7d4d4",
  },
});

export default ItemCreationInput;
