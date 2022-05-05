import {
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import Border from "../../Atoms/Borders/border";
import RadioButton from "../../Molecules/Buttons/radioButton";
import DropDown from "../../Molecules/Buttons/dropDown";
import ImageContainer from "../../Molecules/Images/imageContainer";
import DateTime from "../../Molecules/Times/dateTime";
import { createAuction } from "../../../apis/autcionApi";
import { useNavigation } from "@react-navigation/native";

const { height: ScreenHeight } = Dimensions.get("window");

type Props = {
  navigation: any;
  route: object;
};

const ItemCreationInput = (props: Props) => {
  interface Form {
    title: string;
    startPrice: number;
    content: string;
    itemCategories: string;
    auctionType: string;
    startTime: string;
    endTime: null;
    biddingUnit: number;
  }
  interface ImageForm {
    source: string;
  }
  interface Image {
    name: any;
    height: any;
    size: any;
    type: any;
    uri: any;
  }
  const [form, setForm] = useState<Form | null | any>([]);
  const [imgForm, setImgForm] = useState<ImageForm | null | any>([]);
  const [image, setImage] = useState<Image | null | any>([]);
  const [value, setValue] = useState<Form | null | any>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      setForm({});
      setForm((prevState: any) => ({
        form: {
          ...prevState.form,
          auctionType: "LIVE",
          itemCategories: "디지털기기",
        },
      }));
      setValue({
        title: "",
        startPrice: "",
        content: "",
      });
    });
    return unsubscribe;
  }, [props.navigation]);
  const { title, content, startPrice } = value;

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
          form: { ...prevState.form, auctionType: "LIVE" },
        }));
      }
    }
    if (typeof info === "string") {
      setForm((prevState: any) => ({
        form: { ...prevState.form, itemCategories: info },
      }));
    }
  };

  const getDateTime = (info: string, time: string) => {
    if (form.form.auctionType === "NORMAL") {
      setForm((prevState: any) => ({
        form: { ...prevState.form, startTime: "", endTime: info },
      }));
    }
    if (form.form.auctionType === "LIVE") {
      setForm((prevState: any) => ({
        form: { ...prevState.form, startTime: info, endTime: time },
      }));
    }
  };

  const onChangeInput = (item: string, value: any) => {
    if (item === "title") {
      setForm((prevState: any) => ({
        form: { ...prevState.form, title: value },
      }));
      setValue((prevState: any) => ({
        value: { ...prevState.value, title: value },
      }));
    }
    if (item === "startPrice") {
      setForm((prevState: any) => ({
        form: { ...prevState.form, startPrice: value },
      }));
      setValue((prevState: any) => ({
        value: { ...prevState.value, startPrice: value },
      }));
    }
    if (item === "content") {
      setForm((prevState: any) => ({
        form: { ...prevState.form, content: value },
      }));
      setValue((prevState: any) => ({
        value: { ...prevState.value, content: value },
      }));
    }
  };

  const inputForm = (imageForm) => {
    const arr: string[] = [];
    for (let index = 0; index < imageForm.length; index++) {
      const element = imageForm[index];
      arr.push(element);
    }
    setImgForm(arr);
  };

  useEffect(() => {
    setImgForm(imgForm);
  }, [imgForm]);

  const onSubmit = async () => {
    if (imgForm.length <= 1) {
      Alert.alert("이미지를 업로드해주세요.");
    } else if (
      form.form.title === undefined ||
      form.form.content === undefined ||
      form.form.startPrice === undefined
    ) {
      Alert.alert("모든 정보를 입력해주세요.");
    } else if (
      form.form.startTime === undefined ||
      form.form.endTime === undefined
    ) {
      Alert.alert("경매 시간을 설정해주세요.");
    }

    const formData = new FormData();
    for (var i = 0; i < imgForm.length; i++) {
      const trimmedURI = imgForm[i].uri.replace("file://", "");
      const fileName = trimmedURI.split("/").pop();
      setImage({
        height: imgForm[i].height,
        type: imgForm[i].type,
        width: imgForm[i].width,
        uri: trimmedURI,
        name: fileName,
      });
    }

    formData.append("images", image);
    formData.append("title", form.form.title);
    formData.append("content", form.form.content);
    formData.append("startPrice", form.form.startPrice);
    formData.append("startTime", form.form.startTime);
    formData.append("endTime", form.form.endTime);
    formData.append("auctionType", form.form.auctionType);
    formData.append("itemCategories", form.form.itemCategories);
    console.warn(formData);
    const result = await createAuction(formData);
    if (result.statusCode === 201) {
      if (result.data.auctionType === "NORMAL") {
        navigation.navigate("auctionDetail");
      } else {
        navigation.navigate("detail");
      }
    } else {
      Alert.alert("경매 물품 등록에 실패하였습니다.");
    }
    console.warn(result);
  };
  return (
    <View>
      <ImageContainer
        navigation={props.navigation}
        route={props.route}
        inputForm={inputForm}
      />
      <RadioButton
        getSelectInformation={onSelect}
        navigation={props.navigation}
        route={props.route}
      />
      <DropDown getSelectInformation={onSelect} navigation={props.navigation} />
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
          {select ? "경매 종료 날짜" : "경매 시작 날짜"}
        </Text>
        <DateTime
          getSelectInformation={getDateTime}
          navigation={props.navigation}
          route={props.route}
        />
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
      <View style={{ alignItems: "center", padding: ScreenHeight / 50 }}>
        <TouchableOpacity style={styles.buttonContainer} onPress={onSubmit}>
          <Text style={styles.buttonTextContainer}>등록하기</Text>
        </TouchableOpacity>
      </View>
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
  buttonContainer: {
    backgroundColor: "#0176B7",
    width: "100%",
    borderRadius: 5,
    height: ScreenHeight / 17,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextContainer: {
    color: "#ffffff",
    fontWeight: "200",
    fontSize: ScreenHeight / 40,
  },
});

export default ItemCreationInput;