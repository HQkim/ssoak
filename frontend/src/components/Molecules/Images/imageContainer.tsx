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

const { height: ScreenHeight } = Dimensions.get("window");

type Props = {
  navigation: any;
  route: object;
};

const ImageContainer = (props: Props) => {
  interface Item {
    imgSource: string;
  }

  const [image, setImage] = useState<Item | null | any>([]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      setImage([]);
    });
    return unsubscribe;
  }, [props.navigation]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
    });
    if (!result.cancelled) {
      setImage([...image, { imgSource: result.uri }]);
    }
  };

  const deleteImage = (imageSource: string) => {
    setImage(image.filter((item: any) => item.imgSource !== imageSource));
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
          image.map((item: any, idx: number) => {
            return (
              <TouchableWithoutFeedback>
                <View style={{ alignItems: "flex-end" }}>
                  <Image
                    source={{ uri: item.imgSource }}
                    style={styles.imgContainer}
                  />
                  <Ionicons
                    name={"close-circle"}
                    size={ScreenHeight / 40}
                    onPress={() => deleteImage(item.imgSource)}
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

export default ImageContainer;
