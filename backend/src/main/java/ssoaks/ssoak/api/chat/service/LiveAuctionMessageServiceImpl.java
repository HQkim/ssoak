package ssoaks.ssoak.api.chat.service;

import org.springframework.stereotype.Service;
import ssoaks.ssoak.api.chat.dto.ReqLiveAuctionMessageDto;
import ssoaks.ssoak.api.chat.dto.ResLiveAuctionMessageDto;
import ssoaks.ssoak.api.member.entity.Member;

import java.time.LocalDateTime;

@Service
public class LiveAuctionMessageServiceImpl implements LiveAuctionMessageService{

    @Override
    public ResLiveAuctionMessageDto sendAuctionMessage(ReqLiveAuctionMessageDto reqLiveAuctionMessageDto, Member member) {

        Long messageType = reqLiveAuctionMessageDto.getMessageType();

//        if (messageType == 1 && ) {
//
//        } else {
//
//        }

        return ResLiveAuctionMessageDto.builder()
                .itemSeq(reqLiveAuctionMessageDto.getItemSeq())
                .memberNickname(member.getNickname())
                .messageType(messageType)
                .content(reqLiveAuctionMessageDto.getContent())
                .createdAt(LocalDateTime.now())
                .build();
    }
}
