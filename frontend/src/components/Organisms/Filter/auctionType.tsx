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
import { useNavigation, useFocusEffect } from "@react-navigation/native";

type Props = {
  getSelectInformation: Function;
  navigation: any;
  route: object;
  reset: Boolean;
};
const { height: ScreenHeight } = Dimensions.get("window");
const { width: ScreenWidth } = Dimensions.get("window");

const AuctionType = (props: Props) => {
  const [select, setSelect] = useState(true);
  const onSelect = () => {
    setSelect(!select);
    props.getSelectInformation(select);
  };

  useFocusEffect(
    React.useCallback(() => {
      setSelect(true);
    }, [props.reset])
  );

  return (
    <View>
      <View style={{ height: ScreenHeight / 20 }}>
        <Text style={{ fontSize: ScreenHeight / 45 }}>경매유형</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={onSelect}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {select ? <RadioButton /> : null}
          </View>
          <Typography title="실시간 경매" style={styles.fontStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSelect}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.radioButton}>
            {select ? null : <RadioButton />}
          </View>
          <Typography title="일반 경매" style={styles.fontStyle} />
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

export default AuctionType;

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
