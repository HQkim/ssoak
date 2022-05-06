package ssoaks.ssoak.api.chat.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssoaks.ssoak.api.auction.repository.ItemRepository;
import ssoaks.ssoak.api.chat.dto.request.ReqChatDto;
import ssoaks.ssoak.api.chat.dto.response.ResChatDto;
import ssoaks.ssoak.api.chat.entity.Chat;
import ssoaks.ssoak.api.chat.repository.ChatRepository;
import ssoaks.ssoak.api.member.repository.MemberRepository;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService{

    private final ChatRepository chatRepository;

    private final MemberRepository memberRepository;

    private final ItemRepository itemRepository;

    @Override
    public ResChatDto insertChat(ReqChatDto reqChatDto) {
        Chat savedChat = chatRepository.save(Chat.builder()
                .item(itemRepository.findById(reqChatDto.getItemSeq()).orElse(null))
                .content(reqChatDto.getContent())
                .seller(memberRepository.findById(reqChatDto.getSellerSeq()).orElse(null))
                .buyer(memberRepository.findById(reqChatDto.getBuyerSeq()).orElse(null))
                .build());
        return ResChatDto.builder()
                .itemSeq(savedChat.getSeq())
                .content(savedChat.getContent())
                .sellerNickname(savedChat.getSeller().getNickname())
                .buyerNickname(savedChat.getBuyer().getNickname())
                .createdDate(savedChat.getCreatedDate())
                .build();
    }
}
