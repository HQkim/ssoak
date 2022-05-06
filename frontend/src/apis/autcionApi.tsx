import { instance, fileInstance } from "./instance";

export const createAuction = async (formData) => {
  const response = await fileInstance.post("/auctions", formData);
  return response.data;
};

export const detailAuction = async (itemSeq) => {
  const response = await instance.get(`/auctions/${itemSeq}`);
  return response.data.data;
};

export const updateAuction = async (itemSeq, formData) => {
  const response = await fileInstance.patch(`/auctions/${56}`, formData);
  return response.data;
};

export const deleteAuction = async (itemSeq) => {
  const response = await instance.delete(`/auctions/${59}`);
  return response;
};

export const likeItem = async (itemSeq) => {
  const response = await instance.post(`/auctions/${itemSeq}/like`);
  return response;
};

export const cancelLikeItem = async (itemSeq) => {
  const response = await instance.delete(`/auctions/${itemSeq}/like`);
  return response;
};
