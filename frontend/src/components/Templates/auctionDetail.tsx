import React from "react";
import AuctionDescription from "../Molecules/Description/auctionDescription";

const AuctionDetail = ({ item, reqItem }) => {
  return <AuctionDescription item={item} reqItem={reqItem} />;
};

export default AuctionDetail;
