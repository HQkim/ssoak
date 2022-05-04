import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  Text,
} from "react-native";
import React, { useState, useEffect } from "react";
import ItemCreationInput from "../Organisms/Input/itemCreationInput";

const { height: ScreenHeight } = Dimensions.get("window");

type Props = {
  navigation: any;
  route: object;
};

const ItemCreation = (props: Props) => {
  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <SafeAreaView>
            <ItemCreationInput
              navigation={props.navigation}
              route={props.route}
            />
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: ScreenHeight / 80,
  },
});

export default ItemCreation;
