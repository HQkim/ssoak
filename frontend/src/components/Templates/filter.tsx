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
import { searchItem } from "../../apis/categoryApi";

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
  text: string;
  setItems: Function;
};

const { height: ScreenHeight } = Dimensions.get("window");
const { width: ScreenWidth } = Dimensions.get("window");

interface Form {
  auctionType: string;
  category: string;
  sort: string;
  startPrice: number;
  endPrice: number;
  startTime: string;
  endTime: string;
}

const Filter = (props: Props) => {
  const [form, setForm] = useState<Form | null | any>([]);
  const {
    auctionType,
    category,
    sort,
    startPrice,
    endPrice,
    startTime,
    endTime,
  } = form;
  const [select, setSelect] = useState(true);
  const [selectOrder, setSelectOrder] = useState(true);
  const [startString, setStartString] = useState();
  const [endString, setEndString] = useState();
  console.log(startString, "dkdkdkdkdkdkdkdkdkkdkdk");
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
          form: { ...prevState.form, auctionType: "LIVE" },
        }));
      }
    }
    if (typeof info === "string") {
      setForm((prevState: any) => ({
        form: { ...prevState.form, category: info },
      }));
    }
  };

  // 정렬 필터 함수
  const onSelectOrder = (info: boolean) => {
    setSelectOrder(info);
    if (info === true) {
      setForm((prevState: any) => ({
        form: { ...prevState.form, sort: "biddingCount" },
      }));
    } else {
      setForm((prevState: any) => ({
        form: { ...prevState.form, sort: "createdDate" },
      }));
    }
  };

  // 가격 범위 필터 함수
  const onSelectStartPrice = (info: number) => {
    setForm((prevState: any) => ({
      form: { ...prevState.form, startPrice: info },
    }));
  };

  const onSelectEndPrice = (info: number) => {
    setForm((prevState: any) => ({
      form: { ...prevState.form, endPrice: info },
    }));
  };

  // 시작 시간 필터 함수
  const onSelectStartTime = (info: object) => {
    setForm((prevState: any) => ({
      form: { ...prevState.form, startTime: info },
    }));
  };

  const onSelectEndTime = (info: object) => {
    setForm((prevState: any) => ({
      form: { ...prevState.form, endTime: info },
    }));
  };

  // 필터 적용 함수
  const applyFilters = async (form) => {
    // 년-월-일-시-분 비교 변수
    const string_start = JSON.stringify(form.form.startTime).slice(0, 17);
    const string_end = JSON.stringify(form.form.endTime).slice(0, 17);
    const final_start = startString;
    const final_end = endString;
    // console.log(final_start, typeof final_start);
    // console.log(final_end, typeof final_end);

    if (
      form.form.startPrice &&
      form.form.endPrice &&
      form.form.startPrice > form.form.endPrice
    ) {
      Alert.alert("최대금액을 다시 설정해주세요.");
    } else if (
      form.form.startPrice &&
      form.form.endPrice &&
      form.form.startPrice == form.form.endPrice
    ) {
      Alert.alert("최소금액과 최대금액을 다시 설정해주세요.");
    } else if (
      form.form.startPrice &&
      form.form.endPrice &&
      form.form.startPrice == 0 &&
      form.form.endPrice == 0
    ) {
      Alert.alert("최소금액과 최대금액을 다시 설정해주세요.");
    } else if (
      (form.form.startPrice && !form.form.endPrice) ||
      (!form.form.startPrice && form.form.endPrice)
    ) {
      Alert.alert("최소금액과 최대금액 모두 입력해주세요.");
    } else if (
      form.form.startTime &&
      form.form.endTime &&
      form.form.startTime > form.form.endTime
    ) {
      Alert.alert("종료시간을 다시 설정해주세요.");
    } else if (
      form.form.startTime &&
      form.form.endTime &&
      string_start == string_end
    ) {
      Alert.alert("시작시간과 종료시간을 다시 설정해주세요.");
    } else if (
      (form.form.startTime && !form.form.endTime) ||
      (!form.form.startTime && form.form.endTime)
    ) {
      Alert.alert("시작시간과 종료시간 모두 입력해주세요.");
    } else {
      console.log(final_start, typeof final_start);
      console.log(final_end, typeof final_end);
      setForm((prevState: any) => ({
        form: {
          ...prevState.form,
          startTime: startString,
          endTime: final_end,
        },
      }));
      console.log(form, "필터적용 form");
      console.log(form.form.startTime, typeof form.form.startTime, "이상해");
      const result = await searchItem(form.form);
      console.log(result);
      // props.setItems(result)
    }
  };

  // 필터 초기화 함수 ==> 수정해야함
  const resetFilters = () => {
    setForm((prev: any) => ({
      form: {
        keyword: props.text,
        auctionType: "LIVE",
        category: "",
        sort: "createdDate",
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
          keyword: props.text,
          auctionType: "LIVE",
          category: "",
          sort: "createdDate",
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
          getSelectInspformation={onSelectStartPrice}
          getSelectInepformation={onSelectEndPrice}
          navigation={props.navigation}
          route={props.route}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <TimeRange
          getSelectstInformation={onSelectStartTime}
          getSelectetInformation={onSelectEndTime}
          navigation={props.navigation}
          route={props.route}
          setStartString={setStartString}
          setEndString={setEndString}
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
            onPress={() => applyFilters(form)}
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
