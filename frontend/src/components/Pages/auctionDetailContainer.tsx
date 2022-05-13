import { StyleSheet, View, Dimensions, RefreshControl } from "react-native";
import React, { createRef, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/modules";
import { loadDataAsync, dataReset } from "../../store/modules/detail";
import PagerView from "react-native-pager-view";
// import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
import Carousel from "../Organisms/Carousel";
import AuctionDetail from "../Templates/auctionDetail";
import ImageSkeleton from "../Molecules/Cards/imageSkeleton";
import DescriptionSkeleton from "../Molecules/Cards/autionDescriptionSkeleton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Props = {
  navigation: any;
  route: object;
};

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");
const AutionDetailContainer = (props: Props) => {
  const isLoading = useSelector((state: RootState) => state.detail.isLoading);
  const item = useSelector((state: RootState) => state.detail.item);
  const dispatch = useDispatch();
  const [showIndicator, setShowIndicator] = useState(false);
  const reqItem = props.route.params.id;

  useEffect(() => {
    setShowIndicator(!isLoading);
  }, [isLoading]);

  const onStartLoadData = (id: number) => {
    dispatch(loadDataAsync(id));
  };
  // props.navigation.addListener("focus", () => {
  //   onStartLoadData(props.route.params.id);
  // });
  function isEmptyObject(param) {
    return Object.keys(param).length === 0 && param.constructor === Object;
  }

  useEffect(() => {
    if (isEmptyObject(item)) {
      onStartLoadData(props.route.params.id);
    }
  }, [item]);
  useEffect(() => {
    // console.log(item);
    onStartLoadData(props.route.params.id);

    return () => {
      // console.log("reset normal");
      dispatch(dataReset());
    };
  }, []);

  // props.navigation.addListener("blur", () => {
  //   dispatch(dataReset());
  // });

  let scrollRef: any = useRef();
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
      <View style={styles.box}>
        <PagerView
          style={{ flex: 1 }}
          initialPage={0}
          showPageIndicator={showIndicator}
          keyboardDismissMode={"on-drag"}
          overdrag={true}
        >
          {isLoading === false && item.itemImages ? (
            <Carousel imageUrls={item.itemImages} style={styles.page} />
          ) : (
            <ImageSkeleton />
          )}
        </PagerView>
      </View>
      {isLoading === false && item.itemImages ? (
        <AuctionDetail item={item} reqItem={reqItem} />
      ) : (
        <DescriptionSkeleton />
      )}
    </KeyboardAwareScrollView>
  );
};

export default AutionDetailContainer;

const styles = StyleSheet.create({
  box: {
    height: ScreenHeight / 3,
    backgroundColor: "#999999",
  },
  page: {
    flex: 1,
    width: ScreenWidth,
    alignItems: "center",
    justifyContent: "center",
  },
});
