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
import React from "react";
import ItemUpdate from "../Organisms/Input/itemUpdate";

const { height: ScreenHeight } = Dimensions.get("window");

type Props = {
  navigation: any;
  route: object;
  item: any;
  reqItem: number;
};

const ItemModification = (props: Props) => {
  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <SafeAreaView>
            <ItemUpdate
              navigation={props.navigation}
              route={props.route}
              item={props.item}
              reqItem={props.reqItem}
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

export default ItemModification;
