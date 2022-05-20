package ssoaks.ssoak.api.auction.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import ssoaks.ssoak.api.auction.enums.AuctionType;

@Getter
@ToString
@Builder
@AllArgsConstructor
public class ResItemSeqDto {

    private Long itemSeq;
    private AuctionType auctionType;

}
