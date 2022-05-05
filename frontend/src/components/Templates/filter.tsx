import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Button,
  Alert,
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
  priceRange: Array<number>;
  startTime: Date;
  endTime: Date;
}

const Filter = (props: Props) => {
  const [form, setForm] = useState<Form | null | any>([]);
  const {
    auctionType,
    categories,
    orderType,
    priceRange,
    startTime,
    endTime,
    timeRange,
  } = form;
  const [select, setSelect] = useState(true);
  const [selectOrder, setSelectOrder] = useState(true);
  // 경매유형, 카테고리 필터 함수
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
  // 정렬 필터 함수
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

  // 가격 범위 필터 함수
  const onSelectPrice = (info: Array<object>) => {
    setForm((prevState: any) => ({
      form: { ...prevState.form, priceRange: info },
    }));
  };

  // 시작 시간 필터 함수
  const onSelectTime = (info: Array<object>) => {
    setForm((prevState: any) => ({
      form: { ...prevState.form, timeRange: info },
    }));
  };

  // 필터 적용 함수
  const applyFilters = () => {
    console.log(form);
    console.log(form.form.timeRange);

    if (form.form.priceRange.startPrice > form.form.priceRange.endPrice) {
      Alert.alert("가격범위를 확인해주세요");
    }

    const formData = new FormData();
    formData.append("auctionType", form.form.auctionType);
    formData.append("categories", form.form.categories);
    formData.append("orderType", form.form.orderType);
    formData.append("priceRange", form.form.priceRange);
    formData.append("timeRange", form.form.timeRange);
    console.log(formData);
  };

  // 필터 초기화 함수 ==> 수정해야함
  const resetFilters = () => {
    setForm((prev: any) => ({
      form: {
        auctionType: "LIVE_NORMAL",
        categories: "",
        orderType: "RECENT",
        startPrice: "",
        endPrice: "",
        startTime: "",
        endTime: "",
      },
    }));
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      setForm((prev: any) => ({
        form: {
          auctionType: "LIVE_NORMAL",
          categories: "",
          orderType: "RECENT",
          startPrice: "",
          endPrice: "",
          startTime: "",
          endTime: "",
        },
      }));
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
          getSelectInformation={onSelectPrice}
          navigation={props.navigation}
          route={props.route}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <TimeRange
          getSelectInformation={onSelectTime}
          navigation={props.navigation}
          route={props.route}
        />
      </View>
      <View style={{ marginTop: 30, height: ScreenHeight / 10 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={resetFilters}
            style={props.styles.resetContainer}
          >
            <Text style={props.styles.resetText}>초기화</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={applyFilters}
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
