package ssoaks.ssoak.api.auction.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import ssoaks.ssoak.api.member.dto.response.MemberSimpleInfoDto;

@Getter
@ToString
public class ItemSimpleOverviewDto {

    private Long itemSeq;
    private String title;
    private String imageUrl;
    private Integer startPrice;
    private Integer biddingPrice;
    private MemberSimpleInfoDto seller;

    @Builder
    @QueryProjection
    public ItemSimpleOverviewDto(Long itemSeq, String title, String imageUrl,
                                 Integer startPrice, Integer biddingPrice,
                                 MemberSimpleInfoDto seller) {
        this.itemSeq = itemSeq;
        this.title = title;
        this.imageUrl = imageUrl;
        this.startPrice = startPrice;
        this.biddingPrice = biddingPrice;
        this.seller = seller;
    }
}
