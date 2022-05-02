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
    private MemberSimpleInfoDto buyer;

    @Builder
    @QueryProjection
    public BiddingSimpleInfoDto(Integer biddingPrice, LocalDateTime biddingDate, MemberSimpleInfoDto buyer) {
        this.biddingPrice = biddingPrice;
        this.biddingDate = biddingDate;
        this.buyer = buyer;
    }
}
