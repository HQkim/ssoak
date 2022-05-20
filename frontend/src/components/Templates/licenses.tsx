import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Platform,
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
        item.libraryName.includes(searchKeyword),
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
          height: 60,
          // width: "100%",
          justifyContent: "center",
          //   alignItems: "center",
          marginLeft: 10,
          shadowOpacity: 1,
          ...Platform.select({
            ios: {
              shadowColor: "rgb(50, 50, 50)",
              backgroundColor: "#ffffff",
              shadowOpacity: 0.25,
              shadowRadius: 5,
              shadowOffset: {
                height: -1,
                width: 0,
              },
            },
            android: {
              backgroundColor: "#ffffff",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 2,
            },
          }),
          marginRight: 10,
          margin: 10,
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
