package ssoaks.ssoak.api.chat.dto;

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

    @Builder
    public ResChatDto(Long itemSeq, String sellerNickname, String buyerNickname, String content, LocalDateTime createdDate) {
        this.itemSeq = itemSeq;
        this.sellerNickname = sellerNickname;
        this.buyerNickname = buyerNickname;
        this.content = content;
        this.createdDate = createdDate;
    }
}
