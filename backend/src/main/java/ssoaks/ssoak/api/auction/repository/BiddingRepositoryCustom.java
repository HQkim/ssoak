package ssoaks.ssoak.api.auction.repository;

import ssoaks.ssoak.api.auction.entity.Bidding;
import ssoaks.ssoak.api.chat.dto.ResLiveAuctionMessageDto;

public interface BiddingRepositoryCustom {

    Bidding getLatestBiddingByItemSeq(Long itemSeq);
}
