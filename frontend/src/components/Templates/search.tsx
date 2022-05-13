import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AuctionTypeTag from "../Atoms/Tags/auctionTypeTag";
import CompletedTag from "../Atoms/Tags/completedTag";
import { searchItem } from "../../apis/categoryApi";

type Props = {
  style: object;
  navigation: any;
  text: string;
  items: any;
  form: any;
  setForm: Function;
};

type items = {
  items: Array<object>;
};

const { height: ScreenHeight } = Dimensions.get("window");
const { width: ScreenWidth } = Dimensions.get("window");

const Search = (props: Props) => {
  const [data, setData] = useState<items | null | any>([]);
  const saveData = (data) => {
    setData(data);
  };

  useEffect(() => {
    if (props.text) {
      saveData(props.items);
    } else {
      setData([]);
    }
  }, [props]);

  const getMoreItems = async (form) => {
    const page = form.form.page;
    const result = await searchItem(form.form);
    const more_data = data.concat(result);
    await setData(more_data);
    form.form.page = page + 1;
  };

  const navigation: any = useNavigation();
  const goDetail = (item) => {
    if (item.auctionType == "NORMAL") {
      navigation.navigate("auctionDetail", {
        id: item.itemSeq,
      });
    } else {
      navigation.navigate("detail", {
        id: item.itemSeq,
      });
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ marginTop: 15 }}>
      <TouchableOpacity onPress={() => goDetail(item)}>
        <View style={{ flexDirection: "row" }}>
          <AuctionTypeTag
            styles={{ tag: styles.auctionTypeTag }}
            text={item.auctionType == "LIVE" ? "실시간" : "일반"}
          ></AuctionTypeTag>
          <AuctionTypeTag
            styles={{ tag: styles.categoryTag }}
            text={item.category}
          ></AuctionTypeTag>
        </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <View style={{ flex: 2 }}>
            <Image
              source={{ uri: item.imageUrl }}
              style={{
                width: ScreenHeight / 10,
                height: ScreenHeight / 10,
                borderColor: "#d7d4d4",
                borderWidth: 1,
              }}
            />
          </View>
          <View style={{ flex: 6, justifyContent: "space-between" }}>
            <Text style={{ fontSize: 18 }} numberOfLines={2}>
              {item.title}
            </Text>
            <View>
              <Text>{item.isCompleted}</Text>
              <View style={{ flexDirection: "row" }}>
                <CompletedTag
                  styles={{ tag: styles.completedTypeTag }}
                  text={"진행중"}
                />
                <Text>참여자 : </Text>
                <TextInput
                  editable={false}
                  maxLength={5}
                  value={
                    item.biddingCount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 명"
                  }
                  style={styles.textArea}
                  textAlign="center"
                />
              </View>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginTop: ScreenWidth / 30 }}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text>시초가 : </Text>
            <TextInput
              editable={false}
              maxLength={10}
              value={
                item.startPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 원"
              }
              style={styles.textArea}
              textAlign="center"
            />
          </View>
          <View style={{ flexDirection: "row", flex: 1, marginLeft: 19 }}>
            <Text>입찰가 : </Text>
            <TextInput
              editable={false}
              maxLength={10}
              value={
                item.biddingPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 원"
              }
              style={styles.textArea}
              textAlign="center"
            />
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              marginTop: ScreenWidth / 30,
            }}
          >
            <Text>경매일 : </Text>
            <TextInput
              editable={false}
              maxLength={50}
              value={
                item.auctionType == "LIVE"
                  ? item.startTime.split("T")[0] +
                    "-" +
                    item.startTime.split("T")[1]
                  : item.startTime.split("T")[0] +
                    "-" +
                    item.startTime.split("T")[1].slice(0, 5) +
                    " ~ " +
                    item.endTime.split("T")[0] +
                    "-" +
                    item.endTime.split("T")[1].slice(0, 5)
              }
              style={styles.textAreaDate}
              textAlign="left"
            />
          </View>
        </View>
        <View
          style={{
            borderBottomColor: "#d7d4d4",
            borderBottomWidth: 1,
            marginTop: 15,
          }}
        ></View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={props.style}>
      {props.text ? (
        <TouchableOpacity onPress={() => props.navigation.navigate("filter")}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="filter-variant"
              size={34}
              color="black"
            />
            <Text style={{ marginLeft: 10 }}>검색필터</Text>
          </View>
        </TouchableOpacity>
      ) : null}
      <View
        style={{
          borderBottomColor: "#d7d4d4",
          borderBottomWidth: 1,
          marginTop: 5,
        }}
      ></View>

      <FlatList
        data={data}
        style={{ backgroundColor: "#fff" }}
        refreshing={false}
        onEndReached={() => getMoreItems(props.form)}
        onEndReachedThreshold={0.8}
        keyExtractor={(data, index) => String(index)}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  auctionTypeTag: {
    width: ScreenWidth / 6,
    height: ScreenHeight / 33,
    backgroundColor: "#F8A33E",
    borderRadius: ScreenWidth / 12,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  categoryTag: {
    fontSize: 15,
    width: ScreenWidth / 4,
    backgroundColor: "#F8A33E",
    borderRadius: ScreenWidth / 12,
    textAlign: "center",
    marginLeft: 10,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  completedTypeTag: {
    width: ScreenWidth / 6,
    height: ScreenHeight / 33,
    backgroundColor: "#719DD7",
    borderRadius: 55,
    marginRight: ScreenWidth / 12,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  textArea: {
    borderRadius: 20,
    borderWidth: 0.5,
    height: 24,
    width: ScreenWidth / 4,
  },
  textAreaDate: {
    borderRadius: 20,
    borderWidth: 0.5,
    height: 24,
    width: ScreenWidth * 0.73,
    paddingLeft: 8,
  },
});
