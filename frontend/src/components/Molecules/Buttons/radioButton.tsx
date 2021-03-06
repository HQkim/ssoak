import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import SubRadioButton from "../../Atoms/Buttons/radioButton";
import Typography from "../../Atoms/Typographies/typography";
import { useFocusEffect } from "@react-navigation/native";

const { height: ScreenHeight } = Dimensions.get("window");

type Props = {
  getSelectInformation: Function;
  navigation: any;
  route: object;
  auctionType: any;
};

const RadioButton = (props: Props) => {
  const [select, setSelect] = useState<any>();

  useFocusEffect(
    React.useCallback(() => {
      const auctionType = props.auctionType;
      if (auctionType === "NORMAL") {
        setSelect(false);
      } else {
        setSelect(true);
      }
      return () => {
        if (auctionType === "NORMAL") {
          setSelect(false);
        } else {
          setSelect(true);
        }
      };
    }, [])
  );

  const onSelect = (type: string) => {
    if (type === "LIVE") {
      setSelect(true);
      props.getSelectInformation(true);
    } else {
      setSelect(false);
      props.getSelectInformation(false);
    }
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
        onPress={() => onSelect("LIVE")}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <View style={styles.radioButton}>
          {select ? <SubRadioButton /> : null}
        </View>
        <Typography title="실시간 경매" style={styles.fontStyle} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onSelect("NORMAL")}
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
