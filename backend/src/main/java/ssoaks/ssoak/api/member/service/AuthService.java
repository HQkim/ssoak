package ssoaks.ssoak.api.member.service;

import ssoaks.ssoak.api.member.entity.Member;

public interface AuthService {

    Member loginByKakao(String authCode);

}
