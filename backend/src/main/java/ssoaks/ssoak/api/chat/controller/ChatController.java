package ssoaks.ssoak.api.chat.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssoaks.ssoak.api.chat.dto.request.ReqChatDto;
import ssoaks.ssoak.api.chat.dto.request.ReqChatLogDto;
import ssoaks.ssoak.api.chat.dto.response.ResChatDto;
import ssoaks.ssoak.api.chat.dto.response.ResChatRoomPageDto;
import ssoaks.ssoak.api.chat.service.ChatService;
import ssoaks.ssoak.api.member.entity.Member;
import ssoaks.ssoak.api.member.service.MemberService;
import ssoaks.ssoak.common.dto.BaseDataResponseDTO;
import ssoaks.ssoak.common.dto.BaseResponseDTO;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/chats")
public class ChatController {

    private final ChatService chatService;

    private final MemberService memberService;

    @PostMapping()
    public ResponseEntity<BaseDataResponseDTO> getChatLog(@Valid @RequestBody ReqChatLogDto reqChatLogDto) {

        try {
            List<ResChatDto> chatLogs = chatService.getChatLog(reqChatLogDto);
            return ResponseEntity.status(200).body(new BaseDataResponseDTO(200,
                    "채팅 내역 조회 성공", chatLogs));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(409).body(new BaseDataResponseDTO(409,
                    e.getMessage(), null));
        }
    }

    @GetMapping()
    public ResponseEntity<BaseDataResponseDTO> getChatList(Pageable pageable) {
        try {
            Member member = memberService.getMemberByAuthentication();
            ResChatRoomPageDto chatRooms = chatService.getChatRoomList(pageable, member);
            return ResponseEntity.status(200).body(new BaseDataResponseDTO(200,
                    "채팅방 조회 성공", chatRooms));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(409).body(new BaseDataResponseDTO(409,
                    e.getMessage(), null));
        }
    }
}
