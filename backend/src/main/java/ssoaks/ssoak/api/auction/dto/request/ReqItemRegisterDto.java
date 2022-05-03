package ssoaks.ssoak.api.auction.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;
import ssoaks.ssoak.api.auction.enums.AuctionType;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@Getter
public class ReqItemRegisterDto {

    private String title;
    private String content;
    private Integer startPrice;
    private Integer biddingUnit;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss") // "2022-04-27T13:09:20"
    private LocalDateTime startTime;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime endTime;
    private AuctionType auctionType;
    private List<String> itemCategories;

}
