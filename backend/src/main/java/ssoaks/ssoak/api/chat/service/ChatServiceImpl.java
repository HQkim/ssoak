package ssoaks.ssoak.api.chat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ssoaks.ssoak.api.chat.dto.ReqChatDto;
import ssoaks.ssoak.api.chat.dto.ResChatDto;
import ssoaks.ssoak.api.chat.entity.Chat;
import ssoaks.ssoak.api.chat.repository.ChatRepository;

@Service
public class ChatServiceImpl implements ChatService{

//    @Autowired
//    private ChatRepository chatRepository;
//
//    @Autowired
//    private MemberRepository memberRepository;
//
//    @Autowired
//    private ItemRepository itemRepository;
//
//    @Override
//    public ResChatDto insertChat(ReqChatDto reqChatDto) {
//        Chat savedChat = chatRepository.save(Chat.builder()
//                .item(itemRepository.findById(Long.parseLong(reqChatDto.getMemberId())).orElse(null))
//                .content(reqChatDto.getContent())
//                .seller(memberRepository.findById(reqChatDto.getSellerSeq()).orElse(null))
//                .buyer(memberRepository.findById(reqChatDto.getBuyerSeq()).orElse(null))
//                .build());
//        return ResChatDto.builder()
//                .itemSeq(savedChat.getSeq())
//                .content(savedChat.getContent())
//                .sellerNickname(savedChat.getSeller().getNickname())
//                .buyerNickname(savedChat.getBuyer().getNickname())
//                .createdDate(savedChat.getCreatedDate())
//                .build();
//    }
}
