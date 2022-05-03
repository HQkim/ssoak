package ssoaks.ssoak.api.auction.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ssoaks.ssoak.api.auction.enums.AuctionType;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class ItemOverviewDto {

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


    @Builder
    @QueryProjection
    public ItemOverviewDto(Long itemSeq, String title, Integer startPrice, LocalDateTime startTime, LocalDateTime endTime, AuctionType auctionType, Boolean isSold, Integer biddingCount, Integer lastPrice) {
        this.itemSeq = itemSeq;
        this.title = title;
        this.startPrice = startPrice;
        this.startTime = startTime;
        this.endTime = endTime;
        this.auctionType = auctionType;
        this.isSold = isSold;
        this.biddingCount = biddingCount;
        this.lastPrice = lastPrice;
    }
}
