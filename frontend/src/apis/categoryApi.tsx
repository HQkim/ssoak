import { instance } from "./instance";

export const searchItem = async (item) => {
  try {
    const response = await instance.get("/auctions/search", {
      params: {
        keyword: item.keyword,
        page: 1,
        size: 10,
        sort: item.sort,
        auctionType: item.auctionType,
        startPrice: item.startPrice,
        endPrice: item.endPrice,
        startTime: item.startTime,
        endTime: item.endTime,
      },
    });
    if (response.data.statusCode === 200) {
      console.log("물품 조회 성공", response.data.data.auctionList);
      return response.data.data.auctionList;
    } else if (response.data.statusCode === 409) {
      console.log("데이터 형식 에러");
    }
  } catch (e) {
    console.log(e);
  }
};
