import { StyleSheet, Text, View, Linking } from "react-native";
import React from "react";

type Props = {};

const LicenseDetail = (props: any) => {
  const item = props.route.params.item;
  return (
    <View style={{ margin: 10 }}>
      <Text style={{ fontSize: 20 }}>library name : {item.libraryName}</Text>
      <Text
        onPress={() => Linking.openURL(item.homepage)}
        style={{ color: "blue" }}
      >
        {item.homepage}
      </Text>
      <Text>version : {item.version}</Text>
      {item.author ? (
        <>
          <Text>
            author: {item.author.name ? item.author.name : "anonymous"}
          </Text>

          <Text
            style={{ color: "blue" }}
            onPress={() => Linking.openURL(`mailto:${item.author?.email!}`)}
          >
            {item.author?.email!}
          </Text>
        </>
      ) : null}
      <View style={{ borderBottomWidth: 1, marginTop: 5, marginBottom: 5 }} />
      {item._description ? (
        <Text>description : {item._description}</Text>
      ) : null}
      <View style={{ borderBottomWidth: 1, marginTop: 5, marginBottom: 5 }} />
      <Text>license : {item._license}</Text>
    </View>
  );
};

export default LicenseDetail;
const styles = StyleSheet.create({});
