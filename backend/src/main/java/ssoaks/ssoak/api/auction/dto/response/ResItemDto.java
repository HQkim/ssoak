package ssoaks.ssoak.api.auction.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import ssoaks.ssoak.api.auction.enums.AuctionType;
import ssoaks.ssoak.api.member.dto.response.MemberSimpleInfoDto;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@ToString
public class ResItemDto {

    private Long itemSeq;
    private String title;
    private String content;
    private Integer startPrice;
    private Integer biddingUnit;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private AuctionType auctionType;
    private Boolean isSold;
    private Boolean isLike;
    private Integer likeCount;
    private String itemCategoryName;
    private Integer itemCategorySeq;
    private List<String> itemImages;
    private MemberSimpleInfoDto member;
    private BiddingSimpleInfoDto bidding;
    private MemberSimpleInfoDto seller;

    @QueryProjection
    @Builder
    public ResItemDto(Long itemSeq,String title, String content, Integer startPrice, Integer biddingUnit,
                      LocalDateTime startTime, LocalDateTime endTime, AuctionType auctionType,
                      Boolean isSold, Boolean isLike, Integer likeCount, String itemCategoryName,
                      Integer itemCategorySeq, List<String> itemImages, MemberSimpleInfoDto member,
                      BiddingSimpleInfoDto bidding, MemberSimpleInfoDto seller) {
        this.itemSeq = itemSeq;
        this.title = title;
        this.content = content;
        this.startPrice = startPrice;
        this.biddingUnit = biddingUnit;
        this.startTime = startTime;
        this.endTime = endTime;
        this.auctionType = auctionType;
        this.isSold = isSold;
        this.isLike = isLike;
        this.likeCount = likeCount;
        this.itemCategoryName = itemCategoryName;
        this.itemCategorySeq = itemCategorySeq;
        this.itemImages = itemImages;
        this.member = member;
        this.bidding = bidding;
        this.seller = seller;
    }
}
