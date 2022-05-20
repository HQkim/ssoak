package ssoaks.ssoak.api.chat.service;

import org.springframework.data.domain.Pageable;
import ssoaks.ssoak.api.chat.dto.request.ReqChatDto;
import ssoaks.ssoak.api.chat.dto.request.ReqChatLogDto;
import ssoaks.ssoak.api.chat.dto.response.ResChatDto;
import ssoaks.ssoak.api.chat.dto.response.ResChatRoomPageDto;
import ssoaks.ssoak.api.member.entity.Member;

import java.util.List;

public interface ChatService {
    ResChatDto insertChat(ReqChatDto reqChatDto);

    List<ResChatDto> getChatLog(ReqChatLogDto reqChatLogDto);

    ResChatRoomPageDto getChatRoomList(Pageable pageable, Member member);
}
