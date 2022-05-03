package ssoaks.ssoak.api.chat.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import ssoaks.ssoak.api.chat.dto.ReqChatDto;
import ssoaks.ssoak.api.chat.dto.ReqLiveAuctionMessageDto;
import ssoaks.ssoak.api.chat.dto.ResChatDto;
import ssoaks.ssoak.api.chat.dto.ResLiveAuctionMessageDto;
import ssoaks.ssoak.api.chat.service.ChatService;
import ssoaks.ssoak.api.chat.service.LiveAuctionMessageService;
import ssoaks.ssoak.api.member.entity.Member;
import ssoaks.ssoak.api.member.service.MemberService;

@Controller
@RequiredArgsConstructor
public class ChatWebSocketController {

    private final ChatService chatService;

    private final MemberService memberService;

    private final LiveAuctionMessageService liveAuctionMessageService;

    private final SimpMessagingTemplate template;


    @MessageMapping("/chat")
    public void ChatHandler(ReqChatDto reqChatDto) {

        ResChatDto resChatDto = chatService.insertChat(reqChatDto);
        template.convertAndSend("/queue/" + reqChatDto.getItemSeq()
                + "_" + reqChatDto.getBuyerSeq(), resChatDto);
    }

    @MessageMapping("/live_auction")
    public void LiveAuctionHandler(ReqLiveAuctionMessageDto reqLiveAuctionMessageDto) {

        Member member = memberService.getMemberByAuthentication();
        ResLiveAuctionMessageDto resLiveAuctionMessageDto = liveAuctionMessageService.sendAuctionMessage(reqLiveAuctionMessageDto, member);

        if (resLiveAuctionMessageDto == null) {
            template.convertAndSend("/topic/" + reqLiveAuctionMessageDto.getItemSeq(),
                    "현재 가격보다 크지 않은 입찰입니다");
        } else {
            template.convertAndSend("/topic/" + reqLiveAuctionMessageDto.getItemSeq(), resLiveAuctionMessageDto);
        }
    }
}
