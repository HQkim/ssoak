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
import ImageUpdateContainer from "../../Molecules/Images/imageUpdateContainer";
import DateTime from "../../Molecules/Times/dateTime";
import { updateAuction } from "../../../apis/autcionApi";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const { height: ScreenHeight } = Dimensions.get("window");

type Props = {
  navigation: any;
  route: object;
  item: any;
};
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
interface Images {
  images: any;
}
const ItemUpdate = (props: Props) => {
  const auctionItem = props.item;
  const [item, setItem] = useState(auctionItem);
  const [form, setForm] = useState<Form | null | any>([]);
  const [images, setImages] = useState<Images | null | any>([]);
  const [imgForm, setImgForm] = useState<ImageForm | null | any>([]);
  const [value, setValue] = useState<Form | null | any>({
    value: {
      title: item.title,
      startPrice: item.user.startPrice,
      content: item.description,
    },
  });
  const [select, setSelect] = useState(true);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      setForm((prevState: any) => ({
        form: {
          title: item.title,
          content: item.description,
          startPrice: item.user.startPrice,
          startTime: item.startTime,
          endTime: item.endTime,
          auctionType: item.auctionType,
          itemCategories: item.category,
        },
      }));
      setValue({
        value: {
          title: item.title,
          startPrice: item.user.startPrice,
          content: item.description,
        },
      });
      setImages(props.item.itemImages);
      if (item.auctionType === "NORMAL") {
        setSelect(false);
      } else {
        setSelect(true);
      }
    }, [])
  );

  const { title, content, startPrice } = value.value;
  console.warn(item.itemImages);

  const onSelect = (info: boolean | string) => {
    if (typeof info === "boolean") {
      if (info === false) {
        setForm((prevState: any) => ({
          form: { ...prevState.form, auctionType: "NORMAL" },
        }));
        setSelect(false);
      } else {
        setForm((prevState: any) => ({
          form: { ...prevState.form, auctionType: "LIVE" },
        }));
        setSelect(true);
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
        form: { ...prevState.form, startTime: info, endTime: info },
      }));
    }
    if (form.form.auctionType === "LIVE") {
      setForm((prevState: any) => ({
        form: { ...prevState.form, startTime: info, endTime: time },
      }));
    }
  };

  const onChangeInput = (item: string, itemValue: any) => {
    if (item === "title") {
      setForm((prevState: any) => ({
        form: { ...prevState.form, title: itemValue },
      }));
      setValue((prevState: any) => ({
        value: { ...prevState.value, title: itemValue },
      }));
    }
    if (item === "startPrice") {
      setForm((prevState: any) => ({
        form: { ...prevState.form, startPrice: itemValue },
      }));
      setValue((prevState: any) => ({
        value: { ...prevState.value, startPrice: itemValue },
      }));
    }
    if (item === "content") {
      setForm((prevState: any) => ({
        form: { ...prevState.form, content: itemValue },
      }));
      setValue((prevState: any) => ({
        value: { ...prevState.value, content: itemValue },
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

  const inputImages = (imageList) => {
    setImages(imageList);
  };

  useEffect(() => {
    setImgForm(imgForm);
  }, [imgForm]);

  const onSubmit = async () => {
    console.warn(images, 333);
    const formData = new FormData();

    if (imgForm.length === 0) {
      formData.append("images", imgForm);
    }

    for (var i = 0; i < imgForm.length; i++) {
      const trimmedURI = imgForm[i].uri.replace("file://", "");
      const fileName = trimmedURI.split("/").pop();
      const item: any = {
        height: imgForm[i].height,
        type: imgForm[i].type,
        width: imgForm[i].width,
        uri: trimmedURI,
        name: fileName,
      };
      formData.append("images", item);
    }

    formData.append("imageUrls", images);
    formData.append("title", form.form.title);
    formData.append("content", form.form.content);
    formData.append("startPrice", form.form.startPrice);
    formData.append("startTime", form.form.startTime);
    formData.append("endTime", form.form.endTime);
    formData.append("auctionType", form.form.auctionType);
    formData.append("itemCategories", form.form.itemCategories);
    console.warn(formData);

    if (imgForm.length < 1 && images.length < 1) {
      Alert.alert("이미지를 업로드해주세요.");
    } else if (
      form.form.title === "" ||
      form.form.content === "" ||
      form.form.startPrice === ""
    ) {
      Alert.alert("모든 정보를 입력해주세요.");
    } else if (form.form.startTime === "" && form.form.endTime === "") {
      Alert.alert("경매 시간을 설정해주세요.");
    } else {
      const result = await updateAuction(47, formData);
      if (result.statusCode === 201) {
        if (result.data.auctionType === "NORMAL") {
          navigation.navigate("auctionDetail", {
            id: result.data.itemSeq,
          });
        } else {
          navigation.navigate("detail", {
            id: result.data.itemSeq,
          });
        }
      } else {
        Alert.alert("경매 물품 등록에 실패하였습니다.");
      }
      console.warn(result);
    }
  };
  return (
    <View>
      <ImageUpdateContainer
        navigation={props.navigation}
        route={props.route}
        inputForm={inputForm}
        inputImages={inputImages}
        images={item.itemImages}
      />
      <RadioButton
        getSelectInformation={onSelect}
        navigation={props.navigation}
        route={props.route}
        auctionType={item.auctionType}
      />
      <DropDown
        getSelectInformation={onSelect}
        navigation={props.navigation}
        itemCategory={0}
      />
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
        <DateTime
          getSelectInformation={getDateTime}
          navigation={props.navigation}
          route={props.route}
          item={item}
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
          <Text style={styles.buttonTextContainer}>수정하기</Text>
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

export default ItemUpdate;
