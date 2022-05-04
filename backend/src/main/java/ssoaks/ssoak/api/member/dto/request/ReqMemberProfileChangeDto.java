package ssoaks.ssoak.api.member.dto.request;

import lombok.Data;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@ToString
@Data
public class ReqMemberProfileChangeDto {

    private String nickname;
    private MultipartFile profileImage;

}
