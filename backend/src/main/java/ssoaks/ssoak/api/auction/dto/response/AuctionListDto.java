package ssoaks.ssoak.api.auction.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import ssoaks.ssoak.api.auction.enums.AuctionType;

import java.time.LocalDateTime;

@Getter
@ToString
public class AuctionListDto {
    private Long itemSeq;
    private String title;
    private Integer startPrice;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private AuctionType auctionType;
    private Integer biddingCount;
    private Integer biddingPrice;
    private String imageUrl;

    private Long sellerSeq;
    private String sellerNickname;
    private String sellerprofile;

    private String category;


    @Builder
    @QueryProjection
    public AuctionListDto(Long itemSeq, String title, Integer startPrice, LocalDateTime startTime, LocalDateTime endTime, AuctionType auctionType, Integer biddingCount, Integer biddingPrice, String imageUrl, Long sellerSeq, String sellerNickname, String sellerprofile, String category) {
        this.itemSeq = itemSeq;
        this.title = title;
        this.startPrice = startPrice;
        this.startTime = startTime;
        this.endTime = endTime;
        this.auctionType = auctionType;
        this.biddingCount = biddingCount;
        this.biddingPrice = biddingPrice;
        this.imageUrl = imageUrl;
        this.sellerSeq = sellerSeq;
        this.sellerNickname = sellerNickname;
        this.sellerprofile = sellerprofile;
        this.category = category;
    }
}
