package ssoaks.ssoak.api.auction.repository;

import ssoaks.ssoak.api.auction.entity.Bidding;

public interface BiddingRepositoryCustom {

    Bidding getLatestBiddingByItemSeq(Long itemSeq);
}
