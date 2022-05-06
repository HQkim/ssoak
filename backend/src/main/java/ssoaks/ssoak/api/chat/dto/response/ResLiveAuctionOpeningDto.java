package ssoaks.ssoak.api.chat.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ResLiveAuctionOpeningDto {

    private Long itemSeq;
    private Long memberSeq;
    private String memberNickname;
    private String content;
    private LocalDateTime createdAt;

    @Builder
    public ResLiveAuctionOpeningDto(Long itemSeq, Long memberSeq, String memberNickname, String content, LocalDateTime createdAt) {
        this.itemSeq = itemSeq;
        this.memberSeq = memberSeq;
        this.memberNickname = memberNickname;
        this.content = content;
        this.createdAt = createdAt;
    }
}
