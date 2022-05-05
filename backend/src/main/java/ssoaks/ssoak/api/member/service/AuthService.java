package ssoaks.ssoak.api.member.service;

import ssoaks.ssoak.api.member.entity.Member;

public interface AuthService {

    Member loginByKakao(String authCode);

    String loginByApple(String socialToken);

    String disconnectKakao(String kakaoId) throws Exception;
}
