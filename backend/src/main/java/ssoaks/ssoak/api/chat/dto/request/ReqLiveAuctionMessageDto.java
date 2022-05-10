package ssoaks.ssoak.api.chat.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Getter
@NoArgsConstructor
public class ReqLiveAuctionMessageDto {

    private Long _id;
    private Long itemSeq;
    private String text;
    private LocalDateTime createdAt;
    private Map<String, Object> user;
    private Long type;
}
