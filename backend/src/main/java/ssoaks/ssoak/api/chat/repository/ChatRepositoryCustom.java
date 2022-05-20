package ssoaks.ssoak.api.chat.repository;

import org.springframework.data.domain.Pageable;
import ssoaks.ssoak.api.chat.dto.response.ResChatDto;

import java.util.List;

public interface ChatRepositoryCustom {

    List<ResChatDto> getChatLogBySeqs(Long itemSeq, Long sellerSeq, Long buyerSeq);

    Integer countMyChatRoomByMemberSeq(Long memberSeq);

    List<ResChatDto> getChatRoomByMemberSeq(Pageable pageable, Long memberSeq);
}
