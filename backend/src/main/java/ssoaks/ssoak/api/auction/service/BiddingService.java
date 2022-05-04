package ssoaks.ssoak.api.auction.service;

import ssoaks.ssoak.api.auction.dto.request.ReqBiddingRegisterDto;
import ssoaks.ssoak.api.auction.dto.response.BiddingSimpleInfoDto;

public interface BiddingService {

    BiddingSimpleInfoDto createBidding(Long itemSeq, ReqBiddingRegisterDto registerBiddingDto);

    BiddingSimpleInfoDto successBidding(Long itemSeq, ReqBiddingRegisterDto successBiddingDto);
}
