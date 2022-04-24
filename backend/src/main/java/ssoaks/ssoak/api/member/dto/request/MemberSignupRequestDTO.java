package ssoaks.ssoak.api.member.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MemberSignupRequestDTO {

    private String email;
    private String kakaoId;
    private String googleId;
    private String nickname;
    private String profileImageUrl;

}
