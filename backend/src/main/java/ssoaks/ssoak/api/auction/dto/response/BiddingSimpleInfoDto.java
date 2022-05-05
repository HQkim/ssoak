package ssoaks.ssoak.api.auction.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import ssoaks.ssoak.api.member.dto.response.MemberSimpleInfoDto;

import java.time.LocalDateTime;

@Getter
@ToString
public class BiddingSimpleInfoDto {

    private Integer biddingPrice;
    private LocalDateTime biddingDate;
    private Integer biddingCount;
    private MemberSimpleInfoDto buyer;

    @Builder
    @QueryProjection
    public BiddingSimpleInfoDto(Integer biddingPrice, LocalDateTime biddingDate,Integer biddingCount, MemberSimpleInfoDto buyer) {
        this.biddingPrice = biddingPrice;
        this.biddingDate = biddingDate;
        this.biddingCount = biddingCount;
        this.buyer = buyer;
    }
}
