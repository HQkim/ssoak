import { instance } from "./instance";

export const searchItem = async (item) => {
  try {
    const response = await instance.get("/auctions/search", {
      params: {
        keyword: item,
        page: 1,
        size: 10,
        sort: "createdDate",
        auctionType: "NORMAL",
      },
    });
    console.log(response.data);
  } catch (e) {
    console.log(e);
  }
};
