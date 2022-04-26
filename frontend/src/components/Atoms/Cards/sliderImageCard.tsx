import { StyleSheet, Text, View, Image } from "react-native";
import React, { createRef } from "react";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";

type Props = {
  style: any;
  url: string;
};

const SliderImageCard = (props: Props) => {
  const zoomableViewRef = createRef<ReactNativeZoomableView>();

  return (
    <View style={props.style}>
      <ReactNativeZoomableView
        bindToBorders={true}
        doubleTapZoomToCenter={true}
        maxZoom={1.5}
        ref={zoomableViewRef}
        onZoomEnd={() => zoomableViewRef.current?.zoomTo(1)}
        pinchToZoomInSensitivity={9}
        pinchToZoomOutSensitivity={9}
      >
        <Image
          source={require("../../../../assets/temp.jpg")}
          resizeMode="contain"
          style={{ height: "100%", flex: 1 }}
        />
      </ReactNativeZoomableView>
    </View>
  );
};

export default SliderImageCard;

const styles = StyleSheet.create({});
