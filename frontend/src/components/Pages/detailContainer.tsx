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
const DetailContainer = (props: Props) => {
  const isLoading = useSelector((state: RootState) => state.detail.isLoading);
  const dispatch = useDispatch();
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    setShowIndicator(!isLoading);
  }, [isLoading]);
  const onStartLoadData = (id: number) => {
    dispatch(loadDataAsync(id));
  };

  const [item, setItem] = useState({
    id: 1,
    title: "나는 뭔가를 팔고있어요",
    user: {
      name: "강민수",
      exp: 100,
    },
    type: "normal",
    minbid: 1000,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam temporibus vero provident fugit praesentium quos in velit recusandae repellat beatae est, dicta adipisci, hic omnis nam animi iure nihil. Id.",
    urls: [
      "https://picsum.photos/400",
      "https://picsum.photos/400",
      "https://picsum.photos/400",
      "https://picsum.photos/400",
      "https://picsum.photos/400",
    ],
  });
  useEffect(() => {
    onStartLoadData(item.id);
  }, []);

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
          {isLoading ? (
            <ImageSkeleton />
          ) : (
            <Carousel imageUrls={item.urls} style={styles.page} />
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
