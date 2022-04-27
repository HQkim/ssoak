package ssoaks.ssoak.api.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ResMemberProfileDTO {

    private Long seq;
    private String email;
    private String nickname;
    private String profileImageUrl;

}
