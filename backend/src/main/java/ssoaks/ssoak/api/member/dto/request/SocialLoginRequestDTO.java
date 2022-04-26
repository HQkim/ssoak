package ssoaks.ssoak.api.member.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@ToString
public class SocialLoginRequestDTO {
    private String code;
}
