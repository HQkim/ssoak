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
import ssoaks.ssoak.api.member.entity.Member;
import ssoaks.ssoak.api.member.repository.MemberRepository;
import ssoaks.ssoak.api.member.service.MemberService;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

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
            Member member = memberRepository.findBySeq((Long) reqLiveAuctionMessageDto.getUser().get("_id")).orElse(null);
            Map<String, Object> resUser = new HashMap<String, Object>();
            Map<String, Object> reqUser = reqLiveAuctionMessageDto.getUser();
            resUser.put("_id",reqUser.get("_id"));
            resUser.put("name", member.getNickname());
            resUser.put("avatar", member.getProfileImageUrl());
            ResLiveAuctionMessageDto resLiveAuctionMessageDto = ResLiveAuctionMessageDto.builder()
                    ._id(reqLiveAuctionMessageDto.get_id())
                    .itemSeq(reqLiveAuctionMessageDto.getItemSeq())
                    .createdAt(reqLiveAuctionMessageDto.getCreatedAt())
                    .type(reqLiveAuctionMessageDto.getType())
                    .user(resUser)
                    .build();
            template.convertAndSend("/topic/" + reqLiveAuctionMessageDto.getItemSeq() +
                    "_" + member.getSeq(), resLiveAuctionMessageDto);
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
