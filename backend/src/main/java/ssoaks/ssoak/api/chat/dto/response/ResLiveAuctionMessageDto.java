package ssoaks.ssoak.api.chat.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Getter
@NoArgsConstructor
public class ResLiveAuctionMessageDto {

    private Long _id;
    private Long itemSeq;
    private LocalDateTime createdAt;
    private String text;
    private Long type;
    private Map<String, Object> user;

    @Builder
    public ResLiveAuctionMessageDto(Long _id, Long itemSeq, LocalDateTime createdAt, String text, Long type, Map<String, Object> user) {
        this._id = _id;
        this.itemSeq = itemSeq;
        this.createdAt = createdAt;
        this.text = text;
        this.type = type;
        this.user = user;
    }
}
