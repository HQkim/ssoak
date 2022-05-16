package ssoaks.ssoak.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
@AllArgsConstructor
public class FirebaseItemDto {

    private Long itemSeq;
    private Long sellerSeq;
    private Long buyerSeq;
    private String title;
    private String sellerImgUrl;
    private String buyerImgUrl;
}
