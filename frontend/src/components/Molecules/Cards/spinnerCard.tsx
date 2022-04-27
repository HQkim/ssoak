import { StyleSheet, Dimensions } from "react-native";
import React from "react";
import CardBox from "../../Atoms/Boxes/cardBox";
import MainItemCard from "../../Atoms/Cards/mainItemCard";
import SkeletonContent from "react-native-skeleton-content";

const { height: ScreenHeight } = Dimensions.get("window");
type Props = {
  item: any;
  key: number;
};

const SpinnerCard = (props: Props) => {
  return (
    <CardBox style={styles.cardBox}>
      <MainItemCard item={props.item} style={styles.mainItemCard}>
        <SkeletonContent
          containerStyle={{
            flex: 1,
            width: ScreenHeight / 6,
            margin: 10,
            flexDirection: "row",
          }}
          // animationType="pulse"
          animationDirection="horizontalLeft"
          layout={[
            {
              width: ScreenHeight / 15,
              height: ScreenHeight / 15,
              marginBottom: 6,
            },
            {
              width: ScreenHeight / 15,
              height: ScreenHeight / 30,
              marginLeft: 6,
            },
          ]}
          isLoading={true}
        />
        <SkeletonContent
          isLoading={true}
          animationDirection="horizontalLeft"
          layout={[
            {
              width: ScreenHeight / 8,
              height: ScreenHeight / 50,
              marginBottom: ScreenHeight / 100,
            },
            {
              width: ScreenHeight / 8,
              height: ScreenHeight / 50,
              marginBottom: ScreenHeight / 100,
            },
          ]}
        />
      </MainItemCard>
    </CardBox>
  );
};

export default SpinnerCard;

const styles = StyleSheet.create({
  cardBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  mainItemCard: {
    width: ScreenHeight / 6,
    height: ScreenHeight / 6,
    backgroundColor: "white",
    borderRadius: ScreenHeight / 50,
    marginRight: ScreenHeight / 100,
    marginLeft: ScreenHeight / 100,
  },
  image: {
    height: ScreenHeight / 15,
    width: ScreenHeight / 15,
    borderWidth: 1,
    borderRadius: ScreenHeight / 200,
    borderColor: "#888888",
  },
  cardInnerContainer: {
    margin: ScreenHeight / 100,
    flex: 1,
  },
  itemTitle: {
    marginLeft: ScreenHeight / 100,
    width: ScreenHeight / 13,
    overflow: "hidden",
  },
  divider: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginTop: ScreenHeight / 100,
    marginBottom: ScreenHeight / 100,
  },
  auctionDescription: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
