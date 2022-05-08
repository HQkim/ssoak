package ssoaks.ssoak.api.member.service;

import ssoaks.ssoak.api.member.dto.request.ReqKakaoCallbackDto;

public interface SocialCallbackService {

    Integer checkKakaoCallbackAndDeleteMember(String adminKey, ReqKakaoCallbackDto reqKakaoCallbackDto) throws Exception;
    Integer checkAppleCallbackAndDeleteMember(String jwtApple) throws Exception;

}
