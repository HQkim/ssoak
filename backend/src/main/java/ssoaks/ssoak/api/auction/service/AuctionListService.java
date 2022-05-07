package ssoaks.ssoak.api.auction.service;

import org.springframework.data.domain.Pageable;
import ssoaks.ssoak.api.auction.dto.response.ResAuctionListDto;


public interface AuctionListService {

    ResAuctionListDto getAuctionList(String keyword, Pageable page);

}
