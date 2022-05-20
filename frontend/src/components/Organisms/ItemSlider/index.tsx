import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import React, { ReactNode } from "react";
import CompleteCard from "../../Molecules/Cards/completeCard";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/modules";
import SpinnerCard from "../../Molecules/Cards/spinnerCard";

const items: any[] = [
  {
    item: 1,
    id: 56,
    auctionType: "NORMAL",
    name: "아이폰 팜아이폰 팜아이폰 팜아이폰 팜아이폰 팜아이폰 팜아이폰 팜아이폰 팜아이폰 팜아이폰 팜아이폰 팜아이폰 팜",
    description: "아이폰을 판매합니다. 판매 합니 다 판 매 하 ㅂ니 디ㅏ",
  },
  {
    item: 1,
    id: 56,
    name: "아이폰 팜",
    auctionType: "LIVE",
    description: "아이폰을 판매합니다. 판매 합니 다 판 매 하 ㅂ니 디ㅏ",
  },
  {
    item: 1,
    id: 2,
    name: "아이폰 팜",
    description: "아이폰을 판매합니다. 판매 합니 다 판 매 하 ㅂ니 디ㅏ",
  },
  {
    item: 1,
    id: 2,
    name: "아이폰 팜",
    description: "아이폰을 판매합니다. 판매 합니 다 판 매 하 ㅂ니 디ㅏ",
  },
  {
    item: 1,
    id: 2,
    name: "아이폰 팜",
    description: "아이폰을 판매합니다. 판매 합니 다 판 매 하 ㅂ니 디ㅏ",
  },
  {
    item: 1,
    id: 2,
    name: "아이폰 팜",
    description: "아이폰을 판매합니다. 판매 합니 다 판 매 하 ㅂ니 디ㅏ",
  },
  {
    item: 1,
    id: 2,
    name: "아이폰 팜",
    description: "아이폰을 판매합니다. 판매 합니 다 판 매 하 ㅂ니 디ㅏ",
  },
  {
    item: 1,
    id: 2,
    name: "아이폰 팜",
    description: "아이폰을 판매합니다. 판매 합니 다 판 매 하 ㅂ니 디ㅏ",
  },
];

const nullItems: any[] = [
  {
    item: 1,
    id: 2,
    name: "아이폰 팜아이폰 팜아이폰 팜아이폰 팜아이폰 팜아이폰 팜아이폰 팜아이폰 팜아이폰 팜아이폰 팜아이폰 팜아이폰 팜",
    description: "아이폰을 판매합니다. 판매 합니 다 판 매 하 ㅂ니 디ㅏ",
  },
  {
    item: 1,
    id: 2,
    name: "아이폰 팜",
    description: "아이폰을 판매합니다. 판매 합니 다 판 매 하 ㅂ니 디ㅏ",
  },
  {
    item: 1,
    id: 2,
    name: "아이폰 팜",
    description: "아이폰을 판매합니다. 판매 합니 다 판 매 하 ㅂ니 디ㅏ",
  },
];

type ItemType = {
  [field: string]: string | number;
};

type Props = {
  [item: number | string]: any[] | ReactNode;
  children: ReactNode;
};

const index = (props: Props) => {
  const isLoading = useSelector(
    (state: RootState) => state.mainLoader.isLoading,
  );
  return (
    <>
      {props.children}
      <SafeAreaView style={styles.scrollView}>
        <ScrollView
          horizontal
          contentContainerStyle={{}}
          directionalLockEnabled={true}
          showsHorizontalScrollIndicator={false}
        >
          {!isLoading
            ? items.map((item, idx) => {
                return <CompleteCard item={item} key={idx} />;
              })
            : nullItems.map((item, idx) => {
                return <SpinnerCard item={item} key={idx} />;
              })}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default index;

const styles = StyleSheet.create({
  scrollView: {
    marginBottom: 20,
    height: Dimensions.get("window").height / 5,
    backgroundColor: "#719DD7",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {},
});
