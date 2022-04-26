package ssoaks.ssoak.api.chat.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import ssoaks.ssoak.api.chat.dto.ReqChatDto;
import ssoaks.ssoak.api.chat.dto.ResChatDto;
import ssoaks.ssoak.api.chat.service.ChatService;

@Controller
@RequiredArgsConstructor
public class ChatWebSocketController {

//    @Autowired
//    private ChatService chatService;
//
//    private final SimpMessagingTemplate template;
//
//    // 초기화된 websocket에는 /api/ws
//    // 메시지 보내는 경로: /pub/messages
//    @MessageMapping("/messages")
//    public void SocketHandler(ReqChatDto reqChatDto) {
//
//        ResChatDto resChatDto = chatService.insertChat(reqChatDto);
//        template.convertAndSend("/queue/" + reqChatDto.getItemSeq()
//                + "_" + reqChatDto.getSellerSeq() + "_" + reqChatDto.getBuyerSeq(), resChatDto);
//    }
}
