import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { licenses } from ".././Atoms/Cards/licenses";
import { useNavigation } from "@react-navigation/native";

const Licenses = (props: any) => {
  const [data, setData] = useState(licenses);
  const [searchKeyword, setSearchKeyword] = useState("");
  useEffect(() => {
    if (searchKeyword) {
      const newData = licenses.filter((item) =>
        item.libraryName.includes(searchKeyword)
      );
      setData(newData);
    } else {
      setData(licenses);
    }
  }, [searchKeyword]);
  const navigation = useNavigation();
  const renderItem = (item) => {
    // console.log(item.item);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("licenseDetail", {
            item: item.item,
          })
        }
        style={{
          height: 40,
          // width: "100%",
          justifyContent: "center",
          //   alignItems: "center",
          marginLeft: 10,
        }}
      >
        <Text style={{ fontSize: 20 }}>{item.item.libraryName}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <TextInput
        placeholder="search input"
        value={searchKeyword}
        onChangeText={(key) => setSearchKeyword(key)}
        style={{ width: "100%", height: 30, borderWidth: 1 }}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, idx) => item.libraryName}
      />
    </>
  );
};

export default Licenses;

const styles = StyleSheet.create({});
