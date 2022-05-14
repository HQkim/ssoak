import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {};

const LicenseDetail = (props: any) => {
  console.log(props.route.params);
  return (
    <View>
      <Text>LicenseDetail</Text>
    </View>
  );
};

export default LicenseDetail;

const styles = StyleSheet.create({});
