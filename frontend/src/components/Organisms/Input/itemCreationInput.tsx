import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Border from "../../Atoms/Text/border";
import RadioButton from "../../Molecules/Buttons/radioButton";
import DropDown from "../../Molecules/Buttons/dropDown";
import ImageContainer from "../../Molecules/Images/imageContainer";

const { height: ScreenHeight } = Dimensions.get("window");

type Props = {
  inputForm: Function;
};

const itemCreationInput = (props: Props) => {
  interface Form {
    title: string;
    startPrice: number;
    content: string;
    categories: string;
    auctionType: string;
  }
  const [form, setForm] = useState<Form | null | any>([]);

  const [select, setSelect] = useState(true);
  const onSelect = (info: boolean | string) => {
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
  const onChangeInput = (item: string, value: string | number) => {
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
      <ImageContainer />
      <RadioButton getSelectInformation={onSelect} />
      <DropDown getSelectInformation={onSelect} />
      <TextInput
        placeholder={"글 제목"}
        style={styles.textContainer}
        maxLength={20}
        keyboardType="default"
        multiline={false}
        onChangeText={(text) => onChangeInput("title", text)}
      ></TextInput>
      <Border style={{ borderBottomWidth: 1, borderColor: "#d7d4d4" }} />
      <TextInput
        placeholder={"시초가"}
        style={styles.textContainer}
        maxLength={7}
        keyboardType="numeric"
        multiline={false}
        onChangeText={(text) => onChangeInput("startPrice", text)}
      ></TextInput>
      <Border style={{ borderBottomWidth: 1, borderColor: "#d7d4d4" }} />
      {select ? (
        <TextInput
          placeholder="경매 시작 시간"
          style={styles.textContainer}
          maxLength={300}
          keyboardType="numeric"
          multiline={false}
        ></TextInput>
      ) : (
        <TextInput
          placeholder="경매 종료 시간"
          style={styles.textContainer}
          maxLength={300}
          keyboardType="numeric"
          multiline={false}
        ></TextInput>
      )}
      <Border style={{ borderBottomWidth: 1, borderColor: "#d7d4d4" }} />
      <TextInput
        placeholder={"상품 상세 설명"}
        style={{
          fontSize: ScreenHeight / 45,
          fontWeight: "200",
          height: ScreenHeight / 4,
          marginTop: ScreenHeight / 100,
          padding: ScreenHeight / 50,
        }}
        maxLength={250}
        keyboardType="default"
        multiline={true}
        onChangeText={(text) => onChangeInput("content", text)}
      ></TextInput>
      <Border style={{ borderBottomWidth: 1, borderColor: "#d7d4d4" }} />
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    fontSize: ScreenHeight / 45,
    fontWeight: "200",
    height: ScreenHeight / 16,
    padding: ScreenHeight / 50,
  },
});

export default itemCreationInput;
