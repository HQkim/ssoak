package ssoaks.ssoak.api.auction.service;

import ssoaks.ssoak.api.auction.dto.request.ReqAuctionReviewDto;

public interface ReviewService {

    Boolean updateReview(Long itemSeq, ReqAuctionReviewDto reviewDto);
}
