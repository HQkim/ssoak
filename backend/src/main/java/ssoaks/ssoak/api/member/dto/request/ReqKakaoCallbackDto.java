package ssoaks.ssoak.api.member.dto.request;

import lombok.Data;
import lombok.ToString;

@ToString
@Data
public class ReqKakaoCallbackDto {

    String app_id;
    String user_id;
    String referrer_type;

}
