package ssoaks.ssoak.api.chat.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReqChatLogDto {

    private Long itemSeq;
    private Long sellerSeq;
    private Long buyerSeq;

    @Builder
    public ReqChatLogDto(Long itemSeq, Long sellerSeq, Long buyerSeq) {
        this.itemSeq = itemSeq;
        this.sellerSeq = sellerSeq;
        this.buyerSeq = buyerSeq;
    }
}
