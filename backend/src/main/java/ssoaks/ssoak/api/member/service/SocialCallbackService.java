package ssoaks.ssoak.api.member.service;

import ssoaks.ssoak.api.member.dto.request.ReqKakaoCallbackDto;

public interface SocialCallbackService {

    Integer checkDisconnectCallbackAndDeleteMember(String adminKey, ReqKakaoCallbackDto reqKakaoCallbackDto) throws Exception;

}
