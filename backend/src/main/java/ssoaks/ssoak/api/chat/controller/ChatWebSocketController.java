package ssoaks.ssoak.api.chat.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import ssoaks.ssoak.api.chat.dto.request.ReqChatDto;
import ssoaks.ssoak.api.chat.dto.request.ReqLiveAuctionMessageDto;
import ssoaks.ssoak.api.chat.dto.request.ReqLiveAuctionOpeningDto;
import ssoaks.ssoak.api.chat.dto.response.ResChatDto;
import ssoaks.ssoak.api.chat.dto.response.ResLiveAuctionMessageDto;
import ssoaks.ssoak.api.chat.dto.response.ResLiveAuctionOpeningDto;
import ssoaks.ssoak.api.chat.exception.NotAcceptableBiddingException;
import ssoaks.ssoak.api.chat.service.ChatService;
import ssoaks.ssoak.api.chat.service.LiveAuctionMessageService;
import ssoaks.ssoak.api.member.repository.MemberRepository;
import ssoaks.ssoak.api.member.service.MemberService;

import java.time.LocalDateTime;

@Controller
@RequiredArgsConstructor
public class ChatWebSocketController {

    private final ChatService chatService;

    private final MemberService memberService;

    private final LiveAuctionMessageService liveAuctionMessageService;

    private final SimpMessagingTemplate template;

    private final MemberRepository memberRepository;


    @MessageMapping("/chat")
    public void ChatHandler(ReqChatDto reqChatDto) {

        ResChatDto resChatDto = chatService.insertChat(reqChatDto);
        template.convertAndSend("/queue/" + reqChatDto.getItemSeq() + "_" + reqChatDto.getSellerSeq()
                + "_" + reqChatDto.getBuyerSeq(), resChatDto);
    }

    @MessageMapping("/live_auction")
    public void LiveAuctionHandler(ReqLiveAuctionMessageDto reqLiveAuctionMessageDto) {

//        Member member = memberService.getMemberByAuthentication();
        try {
            ResLiveAuctionMessageDto resLiveAuctionMessageDto = liveAuctionMessageService.sendAuctionMessage(reqLiveAuctionMessageDto);
            template.convertAndSend("/topic/" + reqLiveAuctionMessageDto.getItemSeq(), resLiveAuctionMessageDto);
        } catch (IllegalArgumentException | NotAcceptableBiddingException e) {
            ResLiveAuctionMessageDto resLiveAuctionMessageDto = ResLiveAuctionMessageDto.builder()
                    .itemSeq(reqLiveAuctionMessageDto.getItemSeq())
                    .memberNickname(memberRepository.findBySeq(reqLiveAuctionMessageDto.getMemberSeq()).orElse(null).getNickname())
//                    .memberNickname(member.getNickname())
                    .messageType(reqLiveAuctionMessageDto.getMessageType())
                    .content(e.getMessage())
                    .createdAt(LocalDateTime.now())
                    .build();
            template.convertAndSend("/topic/" + reqLiveAuctionMessageDto.getItemSeq() +
                    "_" + reqLiveAuctionMessageDto.getMemberSeq(), resLiveAuctionMessageDto);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @MessageMapping("/live_auction/openings")
    public void LiveAuctionOpeningHandler(ReqLiveAuctionOpeningDto reqLiveAuctionOpeningDto) {

        ResLiveAuctionOpeningDto resLiveAuctionOpeningDto = liveAuctionMessageService.sendOpeningMessage(reqLiveAuctionOpeningDto);

        template.convertAndSend("/topic/" + reqLiveAuctionOpeningDto.getItemSeq()
                + "_" + reqLiveAuctionOpeningDto.getMemberSeq(), resLiveAuctionOpeningDto);
    }
}
