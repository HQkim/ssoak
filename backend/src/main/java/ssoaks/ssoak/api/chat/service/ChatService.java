package ssoaks.ssoak.api.chat.service;

import ssoaks.ssoak.api.chat.dto.ReqChatDto;
import ssoaks.ssoak.api.chat.dto.ResChatDto;

public interface ChatService {
    ResChatDto insertChat(ReqChatDto reqChatDto);
//    List<ChatRes> getChatList(Study study, Long index);
}
