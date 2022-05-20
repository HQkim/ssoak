package ssoaks.ssoak.api.auction.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
@Builder
@AllArgsConstructor
public class ResAuctionListDto {

    private Integer totalCount;
    private List<AuctionListDto> auctionList;

}
