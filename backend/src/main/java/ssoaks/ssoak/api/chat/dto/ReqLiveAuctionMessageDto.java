package ssoaks.ssoak.api.chat.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReqLiveAuctionMessageDto {

    private Long itemSeq;
    private Long memberSeq;
    private Long messageType;
    private String content;

    @Builder
    public ReqLiveAuctionMessageDto(Long itemSeq, Long memberSeq, Long messageType, String content) {
        this.itemSeq = itemSeq;
        this.memberSeq = memberSeq;
        this.messageType = messageType;
        this.content = content;
    }
}
