import { instance, fileInstance } from "./instance";

export const createAuction = async (formData) => {
  const response = await fileInstance.post("/auctions", formData);
  return response.data;
};

export const detailAuction = async (itemSeq) => {
  const response = await instance.get(`/auctions/${itemSeq}`);
  return response.data.data;
};

export const likeItem = async (itemSeq) => {
  const response = await instance.post(`/auctions/${itemSeq}/like`);
  return response;
};

export const cancelLikeItem = async (itemSeq) => {
  const response = await instance.delete(`/auctions/${itemSeq}/like`);
  return response.data;
};
