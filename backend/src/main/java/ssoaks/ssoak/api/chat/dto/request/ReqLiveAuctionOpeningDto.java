package ssoaks.ssoak.api.chat.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReqLiveAuctionOpeningDto {

    private Long itemSeq;
    private Long memberSeq;

    @Builder
    public ReqLiveAuctionOpeningDto(Long itemSeq, Long memberSeq) {
        this.itemSeq = itemSeq;
        this.memberSeq = memberSeq;
    }
}
