package ssoaks.ssoak.api.auction.dto.response;

import lombok.Getter;
import lombok.ToString;
import ssoaks.ssoak.api.auction.enums.AuctionType;

import java.time.LocalDateTime;

@Getter
@ToString
public class ItemListDto {
    private Long itemSeq;
    private String title;
    private Integer startPrice;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private AuctionType auctionType;

    private Boolean isSold;
    private Integer biddingCount;
    private Integer lastPrice;
    private String imageUrl;


}
