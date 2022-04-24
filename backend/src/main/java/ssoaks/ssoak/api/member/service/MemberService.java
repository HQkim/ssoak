package ssoaks.ssoak.api.member.service;

import ssoaks.ssoak.api.member.dto.request.MemberSignupRequestDTO;
import ssoaks.ssoak.api.member.entity.Member;

public interface MemberService {

    Member signup(MemberSignupRequestDTO memberSignupRequestDTO);

}
