import React, { Component, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import ItemCreationInput from "../../Organisms/Input/itemCreationInput";
import { Ionicons } from "@expo/vector-icons";

const { height: ScreenHeight } = Dimensions.get("window");

export default class ImageCreateContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
    };
  }

  componentDidUpdate() {
    const { params } = this.props.route;
    if (params) {
      const { photos } = params;
      if (photos) this.setState({ photos });
      delete params.photos;
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    const deleteImage = (imageUri) => {
      const { photos } = this.state;

      this.setState({
        photos: photos.filter((photo) => photo.uri !== imageUri),
      });
    };

    const resetImage = () => {
      this.setState({
        photos: [],
      });
    };

    return (
      <ScrollView style={styles.container}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
          <View style={styles.imgContainer}>
            <Ionicons
              name={"camera"}
              size={ScreenHeight / 15}
              onPress={() => {
                navigate("ImageBrowser");
              }}
            />
            <Text style={{ fontSize: ScreenHeight / 60 }}>
              {this.state.photos.length} / 10
            </Text>
          </View>
          {this.state.photos.map((item, i) => (
            <TouchableWithoutFeedback>
              <View style={{ alignItems: "flex-end" }}>
                <Image
                  source={{ uri: item.uri }}
                  key={i}
                  style={styles.imgContainer}
                />
                <Ionicons
                  name={"close-circle"}
                  size={ScreenHeight / 40}
                  onPress={() => deleteImage(item.uri)}
                  style={{ marginRight: ScreenHeight / 150 }}
                />
              </View>
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>
        <ItemCreationInput
          navigation={this.props.navigation}
          route={this.props.route}
          images={this.state.photos}
          resetImage={resetImage}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: ScreenHeight / 70,
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
