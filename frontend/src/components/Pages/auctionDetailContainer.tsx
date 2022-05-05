import { StyleSheet, View, Dimensions, RefreshControl } from "react-native";
import React, { createRef, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/modules";
import { loadDataAsync } from "../../store/modules/detail";
import PagerView from "react-native-pager-view";
// import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
import Carousel from "../Organisms/Carousel";
import AuctionDetail from "../Templates/auctionDetail";
import ImageSkeleton from "../Molecules/Cards/imageSkeleton";
import DescriptionSkeleton from "../Molecules/Cards/autionDescriptionSkeleton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { detailAuction } from "../../apis/autcionApi";

type Props = {
  navigation: any;
  route: object;
};

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");
const AutionDetailContainer = (props: Props) => {
  const isLoading = useSelector((state: RootState) => state.detail.isLoading);
  const dispatch = useDispatch();
  const [showIndicator, setShowIndicator] = useState(false);
  const reqItem = props.route.params.id;

  useEffect(() => {
    setShowIndicator(!isLoading);
  }, [isLoading]);
  const onStartLoadData = (id: number) => {
    dispatch(loadDataAsync(id));
  };

  const [item, setItem] = useState({
    id: 1,
    title: "아이폰 13 미니 핑크",
    user: {
      name: "둥이",
      exp: 100,
      profileImageUrl:
        "https://s3.ap-northeast-2.amazonaws.com/elasticbeanstalk-ap-northeast-2-176213403491/media/magazine_img/magazine_311/3-2-%EC%8D%B8%EB%84%A4%EC%9D%BC.jpg",
    },
    auctionType: "NORMAL",
    minbid: 1000,
    description:
      "아이폰 13 미니 핑크 판매합니다. 2022년 4월 17일에 구매했습니다. 얼마 전에 산 새 제품! 128GB입니다. 빨리 빨리 가져가세요~~ 아이폰 13 미니 핑크 판매합니다. 2022년 4월 17일에 구매했습니다. 얼마 전에 산 새 제품! 128GB입니다. 빨리 빨리 가져가세요~~",
    category: "도서/티켓/음반",
    urls: [
      "https://picsum.photos/400",
      "https://picsum.photos/400",
      "https://picsum.photos/400",
      "https://picsum.photos/400",
      "https://picsum.photos/400",
    ],
  });
  useEffect(() => {
    onStartLoadData(props.route.params.id);
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
      {isLoading ? (
        <DescriptionSkeleton />
      ) : (
        <AuctionDetail item={item} reqItem={reqItem} />
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
