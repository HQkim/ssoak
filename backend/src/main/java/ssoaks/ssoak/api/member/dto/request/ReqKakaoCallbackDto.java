package ssoaks.ssoak.api.member.dto.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Data
public class ReqKakaoCallbackDto {

    String appId;
    String userId;
    String referredType;

}
