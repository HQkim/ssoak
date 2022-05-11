package ssoaks.ssoak.api.auction.dto.request;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class FinishBiddingDto {

    private Long itemSeq;
    private Integer biddingCount;
    private Boolean isSold;
    private Boolean isFinished;

    @Builder
    @QueryProjection
    public FinishBiddingDto(Long itemSeq, Integer biddingCount, Boolean isSold, Boolean isFinished) {
        this.itemSeq = itemSeq;
        this.biddingCount = biddingCount;
        this.isSold = isSold;
        this.isFinished = isFinished;
    }
}
