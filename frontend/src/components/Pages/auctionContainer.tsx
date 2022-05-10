import Action from "../Templates/auction";
import { StyleSheet, View, Dimensions, RefreshControl } from "react-native";
import React, { createRef, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/modules";
import { loadDataAsync } from "../../store/modules/detail";
import AuctionBidInformation from "../Molecules/Description/auctionBidInformation";
import ImageSkeleton from "../Molecules/Cards/imageSkeleton";
import AuctionBidSkeleton from "../Molecules/Cards/auctionBidSkeleton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AuctionNull from "../Molecules/Description/auctionNull";
import PagerView from "react-native-pager-view";

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");

const AuctionDetail = ({ route }) => {
  const auctionItem = route.params.item;
  const reqItem = route.params.reqItem;
  const isLoading = useSelector((state: RootState) => state.detail.isLoading);
  const dispatch = useDispatch();
  const [item, setItem] = useState(auctionItem);

  const onStartLoadData = (id: number) => {
    dispatch(loadDataAsync(id));
  };

  let scrollRef: any = useRef();

  useEffect(() => {
    onStartLoadData(item.id);
  }, []);

  const getItemDetail = () => {
    dispatch(loadDataAsync(reqItem));
    setItem(route.params.item);
  };

  return (
    <KeyboardAwareScrollView
      innerRef={(ref) => {
        scrollRef = ref;
      }}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => onStartLoadData(item.id)}
        />
      }
    >
      {/* {isLoading ? (
        <View style={styles.box}>
          <PagerView style={{ flex: 1 }}>
            <ImageSkeleton />
          </PagerView>
        </View>
      ) : ( */}
      {item.bidding ? <AuctionBidInformation item={item} /> : <AuctionNull />}

      {/* )} */}

      {/* {isLoading ? (
        <AuctionBidSkeleton />
      ) : ( */}
      <Action item={item} reqItem={reqItem} getItemDetail={getItemDetail} />
      {/* )} */}
    </KeyboardAwareScrollView>
  );
};

export default AuctionDetail;

const styles = StyleSheet.create({
  box: {
    height: ScreenHeight / 3,
    backgroundColor: "#ffffff",
  },
});
