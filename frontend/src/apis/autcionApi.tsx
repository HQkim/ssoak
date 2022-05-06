import { instance, fileInstance } from "./instance";

export const createAuction = async (formData) => {
  const response = await fileInstance.post("/auctions/create", formData);
  return response.data;
};
