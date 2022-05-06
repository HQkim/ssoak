package ssoaks.ssoak.api.chat.service;

import ssoaks.ssoak.api.chat.dto.request.ReqChatDto;
import ssoaks.ssoak.api.chat.dto.response.ResChatDto;

public interface ChatService {
    ResChatDto insertChat(ReqChatDto reqChatDto);
}
