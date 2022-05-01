package ssoaks.ssoak.api.chat.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ResLiveAuctionMessageDto {

    private Long itemSeq;
    private Long memberSeq;
    private String memberNickname;
    private Long messageType;
    private String content;
    private LocalDateTime createdAt;

    @Builder
    public ResLiveAuctionMessageDto(Long itemSeq, Long memberSeq, String memberNickname, Long messageType, String content, LocalDateTime createdAt) {
        this.itemSeq = itemSeq;
        this.memberSeq = memberSeq;
        this.memberNickname = memberNickname;
        this.messageType = messageType;
        this.content = content;
        this.createdAt = createdAt;
    }
}
