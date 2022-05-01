package ssoaks.ssoak.api.chat.service;

import ssoaks.ssoak.api.chat.dto.ReqLiveAuctionMessageDto;
import ssoaks.ssoak.api.chat.dto.ResLiveAuctionMessageDto;
import ssoaks.ssoak.api.member.entity.Member;

public interface LiveAuctionMessageService {

    ResLiveAuctionMessageDto sendAuctionMessage(ReqLiveAuctionMessageDto reqLiveAuctionMessageDto, Member member);
}
