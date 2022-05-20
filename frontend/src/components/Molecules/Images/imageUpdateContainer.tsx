import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect } from "@react-navigation/native";

const { height: ScreenHeight } = Dimensions.get("window");

type Props = {
  navigation: any;
  route: object;
  inputForm: Function;
  inputImages: Function;
  images: any;
};

const ImageUpdateContainer = (props: Props) => {
  const imagesUrl = props.images;
  interface Item {
    imgSource: string;
  }
  interface File {
    imgFile: string;
  }
  interface ImageList {
    imgList: string;
  }

  const [image, setImage] = useState<Item | null | any>(imagesUrl);
  const [imageList, setImageList] = useState<Item | null | any>(imagesUrl);
  const [file, setFile] = useState<File | null | any>([]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setImage(imagesUrl);
        setFile([]);
      };
    }, [])
  );

  useEffect(() => {
    props.inputForm(file);
  }, [file]);

  useEffect(() => {
    props.inputImages(imageList);
  }, [imageList]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
    });

    if (!result.cancelled) {
      setImage([...image, result.uri]);
      setFile([...file, result]);
    }
  };

  const deleteImage = (imageSource: string) => {
    setImage(image.filter((item: any) => item !== imageSource));
    setImageList(image.filter((item: any) => item !== imageSource));
    setFile(file.filter((item: any) => item.uri !== imageSource));
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
        <View style={styles.imgContainer}>
          <Ionicons
            name={"camera"}
            size={ScreenHeight / 15}
            onPress={pickImage}
          />
          <Text style={{ fontSize: ScreenHeight / 60 }}>
            {image.length} / 10
          </Text>
        </View>
        {image &&
          image.map((item: any, idx: any) => {
            return (
              <TouchableWithoutFeedback key={idx}>
                <View style={{ alignItems: "flex-end" }}>
                  <Image source={{ uri: item }} style={styles.imgContainer} />
                  <Ionicons
                    name={"close-circle"}
                    size={ScreenHeight / 40}
                    onPress={() => deleteImage(item)}
                    style={{ marginRight: ScreenHeight / 150 }}
                  />
                </View>
              </TouchableWithoutFeedback>
            );
          })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: ScreenHeight / 100,
    marginTop: ScreenHeight / 40,
  },
  imgContainer: {
    width: ScreenHeight / 8,
    height: ScreenHeight / 8,
    marginRight: ScreenHeight / 100,
    borderWidth: 1,
    borderColor: "#2b2a2a",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ImageUpdateContainer;
