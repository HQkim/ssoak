package ssoaks.ssoak.api.chat.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@ToString(of = { "totalCnt", "currentPage", "totalPage" })
@Getter
public class ResChatRoomPageDto {

    private Integer totalCnt;

    private Integer currentPage;

    private Integer totalPage;

    private List<ResChatDto> chatRoomDtos;

    @Builder
    public ResChatRoomPageDto(Integer totalCnt, Integer currentPage, Integer totalPage, List<ResChatDto> chatRoomDtos) {
        this.totalCnt = totalCnt;
        this.currentPage = currentPage;
        this.totalPage = totalPage;
        this.chatRoomDtos = chatRoomDtos;
    }
}
