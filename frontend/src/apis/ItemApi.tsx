import { instance, fileInstance } from "./instance";

export const getOnSaleItems = async () => {
  try {
    const response = await instance.get("/members/profile/selling");
    if (response.data.statusCode == 200) {
      console.log("판매중 물품 조회 성공");
      return response.data.data.items;
    } else if (response.data.statusCode == 401) {
      console.log("회원권한없음");
    } else if (response.data.statusCode == 409) {
      console.log("판매중 물품 조회 실패");
    } else if (response.data.statusCode == 500) {
      console.log("내부 서버 에러");
    }
  } catch (err) {
    console.log(err);
  }
};

export const getPurchasedItems = async () => {
  try {
    const response = await instance.get("/members/profile/buy");
    if (response.data.statusCode == 200) {
      console.log("구매완료 물품 조회 성공");
      return response.data.data.items;
    } else if (response.data.statusCode == 401) {
      console.log("회원권한없음");
    } else if (response.data.statusCode == 409) {
      console.log("판매중 물품 조회 실패");
    } else if (response.data.statusCode == 500) {
      console.log("내부 서버 에러");
    }
  } catch (err) {
    console.log(err);
  }
};

export const getNotSoldItems = async () => {
  try {
    const response = await instance.get("/members/profile/unsold");
    if (response.data.statusCode == 200) {
      console.log("판매 미완료 물품 조회 성공");
      return response.data.data.items;
    } else if (response.data.statusCode == 401) {
      console.log("회원권한없음");
    } else if (response.data.statusCode == 409) {
      console.log("판매중 물품 조회 실패");
    } else if (response.data.statusCode == 500) {
      console.log("내부 서버 에러");
    }
  } catch (err) {
    console.log(err);
  }
};

export const getFavoriteItems = async () => {
  try {
    const response = await instance.get("/members/profile/likes");
    if (response.data.statusCode == 200) {
      console.log("찜한 물품 조회 성공");
      return response.data.data.items;
    } else if (response.data.statusCode == 401) {
      console.log("회원권한없음");
    } else if (response.data.statusCode == 409) {
      console.log("판매중 물품 조회 실패");
    } else if (response.data.statusCode == 500) {
      console.log("내부 서버 에러");
    }
  } catch (err) {
    console.log(err);
  }
};

export const getSoldItems = async () => {
  try {
    const response = await instance.get("/members/profile/sold");
    if (response.data.statusCode == 200) {
      console.log("판매 완료 물품 조회 성공");
      return response.data.data.items;
    } else if (response.data.statusCode == 401) {
      console.log("회원권한없음");
    } else if (response.data.statusCode == 409) {
      console.log("판매중 물품 조회 실패");
    } else if (response.data.statusCode == 500) {
      console.log("내부 서버 에러");
    }
  } catch (err) {
    console.log(err);
  }
};
