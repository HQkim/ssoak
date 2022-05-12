package ssoaks.ssoak.api.member.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class LiveAuctionAlarmDto {
    private Long itemSeq;
    private Long memberSeq;

    @Builder
    @QueryProjection
    public LiveAuctionAlarmDto(Long itemSeq, Long memberSeq) {
        this.itemSeq = itemSeq;
        this.memberSeq = memberSeq;
    }
}

