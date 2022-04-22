import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import CardBox from "../../Atoms/Boxes/cardBox";
import MainItemCard from "../../Atoms/Cards/mainItemCard";
import ItemImageBox from "../../Atoms/Boxes/itemImageBox";

const { height: ScreenHeight } = Dimensions.get("window");
type Props = {
  item: any;
  key: number;
};

const CompleteCard = (props: Props) => {
  return (
    <CardBox style={styles.cardBox}>
      <MainItemCard item={props.item} style={styles.mainItemCard}>
        {/* src 다시 해야함 */}
        <View style={styles.cardInnerContainer}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <ItemImageBox style={styles.image} />
            <View>
              <Text style={styles.itemTitle} numberOfLines={2}>
                {props.item.name}
              </Text>
              <View style={{ marginTop: ScreenHeight / 200 }} />
              <Text style={styles.itemTitle} numberOfLines={1}>
                {"(B)"}강민수
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.auctionDescription}>
            <Text>경매 시작가 : 10,000원</Text>
            <Text>최고 입찰가 : 16,000원</Text>
          </View>
        </View>
      </MainItemCard>
    </CardBox>
  );
};

export default CompleteCard;

const styles = StyleSheet.create({
  cardBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  mainItemCard: {
    width: ScreenHeight / 6,
    height: ScreenHeight / 6,
    backgroundColor: "white",
    borderRadius: ScreenHeight / 100,
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
