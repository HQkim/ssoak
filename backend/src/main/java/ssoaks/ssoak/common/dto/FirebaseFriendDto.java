package ssoaks.ssoak.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
@AllArgsConstructor
public class FirebaseFriendDto {

    private String avatar; // profileUrl
    private Long chatroomId; // itemSeq
    private Long userId; // friendSeq
    private String title; // itemTitle

}
