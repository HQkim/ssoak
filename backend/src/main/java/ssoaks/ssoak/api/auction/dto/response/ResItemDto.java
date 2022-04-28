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


    private String title;
    private Integer startPrice;
    private Integer biddingUnit;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private AuctionType auctionType;
    private Boolean isSold;
    private Boolean isLike;
    private Integer likeCount;
    private MemberSimpleInfoDto member;
    private List<String> itemCategories;

    @QueryProjection
    @Builder

    public ResItemDto(String title, Integer startPrice, Integer biddingUnit, LocalDateTime startTime, LocalDateTime endTime, AuctionType auctionType, Boolean isSold, Boolean isLike, Integer likeCount, MemberSimpleInfoDto member, List<String> itemCategories) {
        this.title = title;
        this.startPrice = startPrice;
        this.biddingUnit = biddingUnit;
        this.startTime = startTime;
        this.endTime = endTime;
        this.auctionType = auctionType;
        this.isSold = isSold;
        this.isLike = isLike;
        this.likeCount = likeCount;
        this.member = member;
        this.itemCategories = itemCategories;
    }
}