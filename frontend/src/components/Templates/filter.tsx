import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import AuctionType from "../Organisms/Filter/auctionType";
import OrderBy from "../Organisms/Filter/orderBy";
import PriceRange from "../Organisms/Filter/priceRange";
import TimeRange from "../Organisms/Filter/timeRange";
import Category from "../Organisms/Filter/category";

type Props = {
  styles: {
    filterTemplate: object;
    resetContainer: object;
    applyContainer: object;
    resetText: object;
    applyText: object;
  };
  navigation: any;
  route: object;
};

const { height: ScreenHeight } = Dimensions.get("window");
const { width: ScreenWidth } = Dimensions.get("window");

interface Form {
  auctionType: string;
  categories: string;
  orderType: string;
  startPrice: number;
  endPrice: number;
  startTime: Date;
  endTime: Date;
}

const Filter = (props: Props) => {
  const [form, setForm] = useState<Form | null | any>([]);
  const {
    auctionType,
    categories,
    orderType,
    startPrice,
    endPrice,
    startTime,
    endTime,
  } = form;
  const [select, setSelect] = useState(true);
  const [selectOrder, setSelectOrder] = useState(true);
  const onSelect = (info: boolean | string) => {
    if (typeof info === "boolean") {
      setSelect(info);
      if (info === true) {
        setForm((prevState: any) => ({
          form: { ...prevState.form, auctionType: "NORMAL" },
        }));
      } else {
        setForm((prevState: any) => ({
          form: { ...prevState.form, auctionType: "LIVE_NORMAL" },
        }));
      }
    }
    if (typeof info === "string") {
      setForm((prevState: any) => ({
        form: { ...prevState.form, categories: info },
      }));
    }
  };
  const onSelectOrder = (info: boolean) => {
    setSelectOrder(info);
    if (info === true) {
      setForm((prevState: any) => ({
        form: { ...prevState.form, orderType: "RECENT" },
      }));
    } else {
      setForm((prevState: any) => ({
        form: { ...prevState.form, orderType: "POPULAR" },
      }));
    }
  };

  console.log(form);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      setForm({
        auctionType: "LIVE_NORMAL",
        categories: "",
        orderType: "RECENT",
        startPrice: "",
        endPrice: "",
        startTime: "",
        endTime: "",
      });
    });
    return unsubscribe;
  }, [props.navigation]);

  return (
    <View style={props.styles.filterTemplate}>
      <View
        style={{
          borderBottomColor: "#d7d4d4",
          borderBottomWidth: 1,
        }}
      ></View>
      <View style={{ marginTop: 10 }}>
        <AuctionType
          getSelectInformation={onSelect}
          navigation={props.navigation}
          route={props.route}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Category
          getSelectInformation={onSelect}
          navigation={props.navigation}
          route={props.route}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <OrderBy
          getSelectInformation={onSelectOrder}
          navigation={props.navigation}
          route={props.route}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <PriceRange
          getSelectInformation={onSelect}
          navigation={props.navigation}
          route={props.route}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <TimeRange
          getSelectInformation={onSelect}
          navigation={props.navigation}
          route={props.route}
        />
      </View>
      <View style={{ marginTop: 30, height: ScreenHeight / 10 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={() => console.warn("초기화")}
            style={props.styles.resetContainer}
          >
            <Text style={props.styles.resetText}>초기화</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.warn("필터적용")}
            style={props.styles.applyContainer}
          >
            <Text style={props.styles.applyText}>필터 적용</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({});
