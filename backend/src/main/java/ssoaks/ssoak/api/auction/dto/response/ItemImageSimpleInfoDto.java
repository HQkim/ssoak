package ssoaks.ssoak.api.auction.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ItemImageSimpleInfoDto {

    private Long imageSeq;
    private Long itemSeq;
    private String imageUrl;

    @Builder
    @QueryProjection
    public ItemImageSimpleInfoDto(Long imageSeq, Long itemSeq, String imageUrl) {
        this.imageSeq = imageSeq;
        this.itemSeq = itemSeq;
        this.imageUrl = imageUrl;
    }
}
