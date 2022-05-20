package ssoaks.ssoak.api.chat.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ssoaks.ssoak.api.auction.repository.ItemRepository;
import ssoaks.ssoak.api.chat.dto.request.ReqChatDto;
import ssoaks.ssoak.api.chat.dto.request.ReqChatLogDto;
import ssoaks.ssoak.api.chat.dto.response.ResChatDto;
import ssoaks.ssoak.api.chat.dto.response.ResChatRoomPageDto;
import ssoaks.ssoak.api.chat.entity.Chat;
import ssoaks.ssoak.api.chat.repository.ChatRepository;
import ssoaks.ssoak.api.member.entity.Member;
import ssoaks.ssoak.api.member.repository.MemberRepository;
import ssoaks.ssoak.api.member.service.MemberService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService{

    private final ChatRepository chatRepository;

    private final MemberRepository memberRepository;

    private final ItemRepository itemRepository;

    private final MemberService memberService;

    @Override
    public ResChatDto insertChat(ReqChatDto reqChatDto) {
        String nickname = memberRepository.findById(reqChatDto.getSenderSeq()).orElse(null).getNickname();

        Chat savedChat = chatRepository.save(Chat.builder()
                .item(itemRepository.findById(reqChatDto.getItemSeq()).orElse(null))
                .content(reqChatDto.getContent())
                .seller(memberRepository.findById(reqChatDto.getSellerSeq()).orElse(null))
                .buyer(memberRepository.findById(reqChatDto.getBuyerSeq()).orElse(null))
                .roomId(reqChatDto.getItemSeq()+"_"+ reqChatDto.getSellerSeq() + "_" + reqChatDto.getBuyerSeq())
                .senderNickname(nickname)
                .build());
        return ResChatDto.builder()
                .itemSeq(savedChat.getSeq())
                .content(savedChat.getContent())
                .sellerNickname(savedChat.getSeller().getNickname())
                .buyerNickname(savedChat.getBuyer().getNickname())
                .createdDate(savedChat.getCreatedDate())
                .senderNickname(nickname)
                .build();
    }

    @Override
    public List<ResChatDto> getChatLog(ReqChatLogDto reqChatLogDto) {

        Member member = memberService.getMemberByAuthentication();

        return chatRepository.getChatLogBySeqs(reqChatLogDto.getItemSeq(),
                reqChatLogDto.getSellerSeq(), reqChatLogDto.getBuyerSeq());
    }

    @Override
    public ResChatRoomPageDto getChatRoomList(Pageable pageable, Member member) {

        Integer totalCnt = chatRepository.countMyChatRoomByMemberSeq(member.getSeq());
        Integer totalPage = (int) Math.ceil((double) totalCnt / pageable.getPageSize());
        List<ResChatDto> chatRooms = chatRepository.getChatRoomByMemberSeq(pageable, member.getSeq());
        return ResChatRoomPageDto.builder()
                .totalCnt(totalCnt)
                .totalPage(totalPage)
                .currentPage(pageable.getPageNumber())
                .chatRoomDtos(chatRooms)
                .build();
    }
}
