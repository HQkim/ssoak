package ssoaks.ssoak.api.auction.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import ssoaks.ssoak.api.auction.enums.AuctionType;

@Getter
@ToString
public class ResItemSeqDto {

    private Long itemSeq;
    private AuctionType auctionType;

    @Builder
    public ResItemSeqDto(Long itemSeq, AuctionType auctionType) {
        this.itemSeq = itemSeq;
        this.auctionType = auctionType;
    }
}
