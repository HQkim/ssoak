import { StyleSheet, View, Dimensions, RefreshControl } from "react-native";
import React, { createRef, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/modules";
import { loadDataAsync } from "../../store/modules/detail";
import PagerView from "react-native-pager-view";
// import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
import Carousel from "../Organisms/Carousel";
import Detail from "../Templates/detail";
import ImageSkeleton from "../Molecules/Cards/imageSkeleton";
import DescriptionSkeleton from "../Molecules/Cards/descriptionSkeleton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Props = {};

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");
const DetailContainer = (props: any) => {
  const isLoading = useSelector((state: RootState) => state.detail.isLoading);
  const item = useSelector((state: RootState) => state.detail.item);
  // const isLoading = false;
  const dispatch = useDispatch();
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    onStartLoadData(props.route.params.id);
  }, []);
  useEffect(() => {
    setShowIndicator(!isLoading);
  }, [isLoading]);
  const onStartLoadData = (id: number) => {
    dispatch(loadDataAsync(id));
  };

  let scrollRef: any = useRef();
  return (
    <KeyboardAwareScrollView
      innerRef={(ref) => {
        scrollRef = ref;
      }}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => onStartLoadData(props.route.params.id)}
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
          layoutDirection="ltr"
        >
          {isLoading ? (
            <ImageSkeleton />
          ) : (
            <Carousel imageUrls={item.itemImages} style={styles.page} />
          )}
        </PagerView>
      </View>
      {isLoading ? <DescriptionSkeleton /> : <Detail item={item} />}
    </KeyboardAwareScrollView>
  );
};

export default DetailContainer;

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
