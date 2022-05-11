import { instance, fileInstance, noHeaderInstance } from "./instance";

export const createAuction = async (formData) => {
  const response = await fileInstance.post("/auctions", formData);
  return response.data;
};

export const detailAuction = async (itemSeq) => {
  const response = await instance.get(`/auctions/${itemSeq}`);
  return response.data.data;
};

export const updateAuction = async (itemSeq, formData) => {
  const response = await fileInstance.patch(`/auctions/${itemSeq}`, formData);
  return response.data;
};

export const deleteAuction = async (itemSeq) => {
  const response = await instance.delete(`/auctions/${itemSeq}`);
  return response;
};

export const likeItem = async (itemSeq) => {
  const response = await instance.post(`/auctions/${itemSeq}/like`);
  return response;
};

export const cancelLikeItem = async (itemSeq) => {
  const response = await instance.delete(`/auctions/${itemSeq}/like`);
  return response.data;
};

export const getList = async ({ keyword, page }) => {
  try {
    const response = await noHeaderInstance.get("/auctions/list", {
      params: {
        keyword,
        page,
        size: 10,
        sort: "createdDate",
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const biddingAuction = async (itemSeq, formData) => {
  const response = await fileInstance.post(
    `/auctions/${itemSeq}/bidding`,
    formData
  );
  return response.data;
};

export const hammerAuction = async (itemSeq, formData) => {
  const response = await fileInstance.post(
    `/auctions/${itemSeq}/hammered`,
    formData
  );
  return response.data;
};
