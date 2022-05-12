import { StyleSheet, Dimensions, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NavigatorTitle from "../../Atoms/Typographies/navigatorTitle";
import NavigatorTextInput from "../../Atoms/Typographies/navigatorTextInput";
import SearchContainer from "../../Pages/searchContainer";
import FilterContainer from "../../Pages/filterContainer";
import { searchItem } from "../../../apis/categoryApi";

type Props = {
  route: object;
};

type Items = {
  items: Array<object>;
};

interface Form {
  keyword: string;
  page: number;
  auctionType: string;
  category: string;
  sort: string;
  startPrice: number;
  endPrice: number;
  startTime: string;
  endTime: string;
}

const Stack = createStackNavigator();
const { width: ScreenWidth } = Dimensions.get("window");
const { height: ScreenHeight } = Dimensions.get("window");
const SearchStackNavigator = (props: Props) => {
  const [text, setText] = useState("");
  const [items, setItems] = useState<Items | null | any>([]);
  const [initPage, setInitPage] = useState(1);
  const [form, setForm] = useState<Form | null | any>([]);
  const {
    keyword,
    page,
    auctionType,
    category,
    sort,
    startPrice,
    endPrice,
    startTime,
    endTime,
  } = form;

  useEffect(() => {
    setForm((prev: any) => ({
      form: {
        keyword: "",
        page: "",
        auctionType: "",
        category: "",
        sort: "",
        startPrice: "",
        endPrice: "",
        startTime: "",
        endTime: "",
      },
    }));
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerBackTitleStyle: {
          color: "black",
          fontSize: 15,
        },
        headerTintColor: "black",
      }}
    >
      <Stack.Screen
        name="search"
        children={({ navigation }) => (
          <SearchContainer
            text={text}
            setText={setText}
            navigation={navigation}
            items={items}
            form={form}
            setForm={setForm}
          />
        )}
        options={{
          headerTitleAlign: "center",
          headerTitle: (props) => (
            <NavigatorTextInput
              style={styles.NavigatorTextInput}
              setText={setText}
              text={text}
              setItems={setItems}
              page={initPage}
              setPage={setInitPage}
              form={form}
              setForm={setForm}
            />
          ),
        }}
      />
      <Stack.Screen
        name="filter"
        children={({ navigation }) => (
          <FilterContainer
            text={text}
            navigation={navigation}
            setItems={setItems}
            route={props.route}
            form={form}
            setForm={setForm}
          />
        )}
        options={{
          headerTitleAlign: "center",
          headerTitle: (props) => (
            <NavigatorTitle title={"검색 필터"} style={styles.navigatorTitle} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default SearchStackNavigator;

const styles = StyleSheet.create({
  navigatorTitle: {
    fontSize: 20,
  },
  NavigatorTextInput: {
    backgroundColor: "#d7d4d4",
    width: ScreenWidth / 2,
    borderRadius: 10,
    textAlign: "center",
    padding: 7,
    position: "relative",
  },
});
