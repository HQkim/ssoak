package ssoaks.ssoak.api.auction.service;

import org.springframework.data.domain.Pageable;
import ssoaks.ssoak.api.auction.dto.request.ReqSearchDto;
import ssoaks.ssoak.api.auction.dto.response.ResAuctionListDto;


public interface AuctionListService {

    ResAuctionListDto getAuctionList(Boolean token, String keyword, Pageable page);

    ResAuctionListDto searchAuctionList(Boolean token, Pageable pageable, ReqSearchDto reqSearchDto);
}
