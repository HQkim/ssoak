package ssoaks.ssoak.api.auction.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class ResItemSeqDto {

    private Long itemSeq;

    @Builder
    public ResItemSeqDto(Long itemSeq) {
        this.itemSeq = itemSeq;
    }
}
