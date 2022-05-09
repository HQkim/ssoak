package ssoaks.ssoak.api.auction.dto.request;


import lombok.Data;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@ToString
@Data
public class ReqSearchDto {

    private String keyword;
    private String AuctionType;
    private String category;
    private Integer startPrice;
    private Integer endPrice;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime startTime;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime endTime;

}
