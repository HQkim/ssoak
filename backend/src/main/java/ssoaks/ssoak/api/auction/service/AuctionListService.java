package ssoaks.ssoak.api.auction.service;

import ssoaks.ssoak.api.auction.dto.response.ItemSimpleOverviewDto;

import java.awt.print.Pageable;
import java.util.List;

public interface AuctionListService {

    List<ItemSimpleOverviewDto> getAuctionList(String keyword);

}
