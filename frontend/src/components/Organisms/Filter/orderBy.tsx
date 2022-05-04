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

const OrderBy = (props: Props) => {
  const [selectOrder, setSelectOrder] = useState(true);
  const onSelectOrder = () => {
    setSelectOrder(!selectOrder);
    props.getSelectInformation(selectOrder);
  };
  return (
    <View>
      <View style={{ height: ScreenHeight / 20 }}>
        <Text style={{ fontSize: ScreenHeight / 45 }}>정렬</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={onSelectOrder}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {selectOrder ? <RadioButton /> : null}
          </View>
          <Typography title="최신순" style={styles.fontStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSelectOrder}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {selectOrder ? null : <RadioButton />}
          </View>
          <Typography title="인기순" style={styles.fontStyle} />
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

export default OrderBy;

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
    fontWeight: "200",
    marginLeft: ScreenHeight / 130,
    fontSize: ScreenHeight / 50,
  },
});
