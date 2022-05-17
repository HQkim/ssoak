import { instance, fileInstance, noHeaderInstance } from "./instance";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const kakaoLogin = async (access_code: string) => {
  const response = await instance.post("/members/login/kakao", {
    code: access_code,
  });
  if (response.data.statusCode === 200) {
    AsyncStorage.setItem("accessToken", response.data.data.accessToken);
  }
  return response.data;
};

export const kakaoProfile = async () => {
  try {
    const response = await instance.get("/members/profile");
    // console.log(response.data);
    if (response.data.statusCode == 200) {
      return response.data;
    } else if (response.data.statusCode == 401) {
      console.warn("회원 권한 없음");
    } else if (response.data.statusCode == 500) {
      console.warn("내부 서버 에러");
    }
  } catch (err) {
    console.log(err);
  }
};

export const kakaoDelete = async () => {
  try {
    const response = await instance.delete("/members/profile");
    if (response.data.statusCode === 200) {
      console.log("회원 탈퇴 성공");
    } else if (response.data.statusCode === 401) {
      console.log("회원 권한 없음");
    } else if (response.data.statusCode === 500) {
      console.log("내부 서버 에러");
    } else if (response.data.statusCode === 503) {
      console.log("카카오 연결 끊기 실패");
    }
  } catch (e) {
    console.log(e);
  }
};
export const editKakaoProfile = async (formData) => {
  try {
    const response = await fileInstance.patch("/members/profile", formData);
    if (response.data.statusCode === 200) {
      console.log("프로필 수정 성공");
    } else if (response.data.statusCode === 401) {
      console.log("회원 권한 없음");
    } else if (response.data.statusCode === 409) {
      console.log("프로필 수정 실패");
    } else if (response.data.statusCode === 500) {
      console.log("내부 서버 에러");
    }
  } catch (e) {
    console.log(e);
  }
};

export const reportUser = async (userSeq) => {
  const response = await instance.post(`members/report`, {
    memberSeq: userSeq,
  });
  return response;
};

export const appleLogin = async (access_code: string) => {
  try {
    const response = await noHeaderInstance.post(
      `/members/login/apple`,
      {},
      {
        headers: {
          "Social-Token": access_code,
        },
      },
    );
    if (response.data.statusCode === 200) {
      AsyncStorage.setItem("accessToken", response.data.data.accessToken);
    }
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
