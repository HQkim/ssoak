package ssoaks.ssoak.api.member.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class ReqKakaoCallbackDto {

    String appId;
    String userId;
    String referredType;

}
