package ssoaks.ssoak.api.chat.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ResChatDto {
    private Long itemSeq;
    private String sellerNickname;
    private String buyerNickname;
    private String content;
    private LocalDateTime createdDate;
    private String senderNickname;

    @QueryProjection
    public ResChatDto(Long itemSeq, String sellerNickname, String buyerNickname, String content, LocalDateTime createdDate) {
        this.itemSeq = itemSeq;
        this.sellerNickname = sellerNickname;
        this.buyerNickname = buyerNickname;
        this.content = content;
        this.createdDate = createdDate;
    }

    @Builder
    public ResChatDto(Long itemSeq, String sellerNickname, String buyerNickname, String content, LocalDateTime createdDate, String senderNickname) {
        this.itemSeq = itemSeq;
        this.sellerNickname = sellerNickname;
        this.buyerNickname = buyerNickname;
        this.content = content;
        this.createdDate = createdDate;
        this.senderNickname = senderNickname;
    }
}
