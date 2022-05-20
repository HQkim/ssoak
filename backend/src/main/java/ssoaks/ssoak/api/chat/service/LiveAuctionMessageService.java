package ssoaks.ssoak.api.chat.service;

import ssoaks.ssoak.api.chat.dto.request.ReqLiveAuctionMessageDto;
import ssoaks.ssoak.api.chat.dto.request.ReqLiveAuctionOpeningDto;
import ssoaks.ssoak.api.chat.dto.response.ResLiveAuctionMessageDto;
import ssoaks.ssoak.api.chat.dto.response.ResLiveAuctionOpeningDto;

public interface LiveAuctionMessageService {

    ResLiveAuctionMessageDto sendAuctionMessage(ReqLiveAuctionMessageDto reqLiveAuctionMessageDto);

    ResLiveAuctionOpeningDto sendOpeningMessage(ReqLiveAuctionOpeningDto reqLiveAuctionOpeningDto);
}
