import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import React, { useState } from "react";
import SubRadioButton from "../../Atoms/Buttons/radioButton";
import Typography from "../../Atoms/Typographies/typography";

const { height: ScreenHeight } = Dimensions.get("window");

type Props = {
  getSelectInformation: Function;
};

const RadioButton = (props: Props) => {
  const [select, setSelect] = useState(true);
  const onSelect = () => {
    setSelect(!select);
    props.getSelectInformation(select);
  };
  return (
    <View
      style={{
        flexDirection: "row",
        padding: ScreenHeight / 100,
        marginLeft: ScreenHeight / 200,
        marginTop: ScreenHeight / 30,
      }}
    >
      <TouchableOpacity
        onPress={onSelect}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <View style={styles.radioButton}>
          {select ? <SubRadioButton /> : null}
        </View>
        <Typography title="실시간 경매" style={styles.fontStyle} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onSelect}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <View style={styles.radioButton}>
          {select ? null : <SubRadioButton />}
        </View>
        <Typography title="일반 경매" style={styles.fontStyle} />
      </TouchableOpacity>
    </View>
  );
};

export default RadioButton;

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
    marginRight: ScreenHeight / 50,
  },
});
