package ssoaks.ssoak.api.auction.dto.request;

import lombok.Data;
import lombok.ToString;

@ToString
@Data
public class ReqBiddingRegisterDto {
    private Integer biddingPrice;
    private Boolean isHammered;
}
