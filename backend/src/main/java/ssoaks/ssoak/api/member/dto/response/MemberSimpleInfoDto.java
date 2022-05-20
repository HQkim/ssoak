package ssoaks.ssoak.api.member.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

@Getter
@ToString
public class MemberSimpleInfoDto {

    private Long seq;
    private String nickname;
    private String profileImageUrl;

    @QueryProjection
    @Builder
    public MemberSimpleInfoDto(Long seq, String nickname, String profileImageUrl) {
        this.seq = seq;
        this.nickname = nickname;
        this.profileImageUrl = profileImageUrl;
    }
}
