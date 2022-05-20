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
import { searchItem, searchItemWithoutToken } from "../../apis/categoryApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  propForm: any;
  propSetForm: Function;
};

const { height: ScreenHeight } = Dimensions.get("window");

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
  const [startString, setStartString] = useState("");
  const [endString, setEndString] = useState("");
  const [reset, setReset] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  // 경매유형, 카테고리 필터 함수
  const onSelect = (info: boolean | string) => {
    if (typeof info === "boolean") {
      setSelect(info);
      if (info === true) {
        props.propSetForm((prevState: any) => ({
          form: { ...prevState.form, auctionType: "NORMAL" },
        }));
      } else {
        props.propSetForm((prevState: any) => ({
          form: { ...prevState.form, auctionType: "LIVE" },
        }));
      }
    }
    if (typeof info === "string") {
      props.propSetForm((prevState: any) => ({
        form: { ...prevState.form, category: info },
      }));
    }
  };

  // 정렬 필터 함수
  const onSelectOrder = (info: boolean) => {
    setSelectOrder(info);
    if (info === true) {
      props.propSetForm((prevState: any) => ({
        form: { ...prevState.form, sort: "biddingCount" },
      }));
    } else {
      props.propSetForm((prevState: any) => ({
        form: { ...prevState.form, sort: "createdDate" },
      }));
    }
  };

  // 가격 범위 필터 함수
  const onSelectStartPrice = (info: number) => {
    props.propSetForm((prevState: any) => ({
      form: { ...prevState.form, startPrice: info },
    }));
  };

  const onSelectEndPrice = (info: number) => {
    props.propSetForm((prevState: any) => ({
      form: { ...prevState.form, endPrice: info },
    }));
  };

  // 시작 시간 필터 함수
  const onSelectStartTime = (info: object) => {
    props.propSetForm((prevState: any) => ({
      form: { ...prevState.form, startTime: info },
    }));
  };

  const onSelectEndTime = (info: object) => {
    props.propSetForm((prevState: any) => ({
      form: { ...prevState.form, endTime: info },
    }));
  };

  // 필터 적용 함수
  const applyFilters = async (form) => {
    console.log(form);
    // 년-월-일-시-분 비교 변수
    const string_start = JSON.stringify(form.form.startTime).slice(0, 17);
    const string_end = JSON.stringify(form.form.endTime).slice(0, 17);

    if (
      props.propForm.form.startPrice &&
      props.propForm.form.endPrice &&
      props.propForm.form.startPrice > props.propForm.form.endPrice
    ) {
      Alert.alert("최대금액을 다시 설정해주세요.");
    } else if (
      props.propForm.form.startPrice &&
      props.propForm.form.endPrice &&
      props.propForm.form.startPrice == props.propForm.form.endPrice
    ) {
      Alert.alert("최소금액과 최대금액을 다시 설정해주세요.");
    } else if (
      props.propForm.form.startPrice &&
      props.propForm.form.endPrice &&
      props.propForm.form.startPrice == 0 &&
      props.propForm.form.endPrice == 0
    ) {
      Alert.alert("최소금액과 최대금액을 다시 설정해주세요.");
    } else if (
      (props.propForm.form.startPrice && !props.propForm.form.endPrice) ||
      (!props.propForm.form.startPrice && props.propForm.form.endPrice)
    ) {
      Alert.alert("최소금액과 최대금액 모두 입력해주세요.");
    } else if (
      props.propForm.form.startTime &&
      props.propForm.form.endTime &&
      props.propForm.form.startTime > props.propForm.form.endTime
    ) {
      Alert.alert("종료시간을 다시 설정해주세요.");
    } else if (
      props.propForm.form.startTime &&
      props.propForm.form.endTime &&
      string_start == string_end
    ) {
      Alert.alert("시작시간과 종료시간을 다시 설정해주세요.");
    } else if (
      (props.propForm.form.startTime && !props.propForm.form.endTime) ||
      (!props.propForm.form.startTime && props.propForm.form.endTime)
    ) {
      Alert.alert("시작시간과 종료시간 모두 입력해주세요.");
    } else {
      const final_start = startString;
      const final_end = endString;
      const start_tmp = final_start.substring(1, 20);
      const end_tmp = final_end.substring(1, 20);
      props.propForm.form.startTime = start_tmp;
      props.propForm.form.endTime = end_tmp;
      if (isLogin == true) {
        console.log(isLogin, "filter 로그인상태");
        const result = await searchItem(props.propForm.form).then((res) => {
          props.setItems(res);
          props.navigation.goBack(res);
          props.propForm.form.page = 2;
        });
      } else {
        console.log(isLogin, "filter 미로그인상태");
        const result = await searchItemWithoutToken(props.propForm.form).then(
          (res) => {
            props.setItems(res);
            props.navigation.goBack(res);
            props.propForm.form.page = 2;
          }
        );
      }
    }
  };

  // 필터 초기화 함수 ==> 수정해야함
  const resetFilters = async () => {
    await setReset(true);
    props.propSetForm((prev: any) => ({
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
    await setReset(false);
  };

  const getAccessToken = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    if (typeof token == "string") {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
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
      props.propForm.form.auctionType = "LIVE";
      props.propForm.form.sort = "createdDate";
      props.propForm.form.page = 1;
      getAccessToken();
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
          reset={reset}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Category
          getSelectInformation={onSelect}
          navigation={props.navigation}
          route={props.route}
          reset={reset}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <OrderBy
          getSelectInformation={onSelectOrder}
          navigation={props.navigation}
          route={props.route}
          reset={reset}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <PriceRange
          getSelectInspformation={onSelectStartPrice}
          getSelectInepformation={onSelectEndPrice}
          navigation={props.navigation}
          route={props.route}
          reset={reset}
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
          reset={reset}
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
            onPress={() => applyFilters(props.propForm)}
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
