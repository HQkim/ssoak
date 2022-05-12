import { StyleSheet, Dimensions, TextInput } from "react-native";
import React, { useState, useRef } from "react";
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

const Stack = createStackNavigator();
const { width: ScreenWidth } = Dimensions.get("window");
const { height: ScreenHeight } = Dimensions.get("window");
const SearchStackNavigator = (props: Props) => {
  const [text, setText] = useState("");
  const [items, setItems] = useState<Items | null | any>([]);
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
            />
          ),
        }}
      />
      <Stack.Screen
        name="filter"
        // component={FilterContainer}
        children={({ navigation }) => (
          <FilterContainer
            text={text}
            navigation={navigation}
            setItems={setItems}
            route={props.route}
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
