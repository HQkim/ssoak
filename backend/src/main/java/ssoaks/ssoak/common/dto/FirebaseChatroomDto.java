package ssoaks.ssoak.common.dto;

import lombok.*;


@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
public class FirebaseChatroomDto {

    private Long firstUser;     // seller
    private Long secondUser;    // buyer

}
