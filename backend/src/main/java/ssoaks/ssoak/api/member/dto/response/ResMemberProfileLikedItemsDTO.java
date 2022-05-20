package ssoaks.ssoak.api.member.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import ssoaks.ssoak.api.auction.dto.response.ItemOverviewLikedDto;

import java.util.List;

@Getter
@ToString
public class ResMemberProfileLikedItemsDTO {

    private List<ItemOverviewLikedDto> items;

    @Builder
    public ResMemberProfileLikedItemsDTO(List<ItemOverviewLikedDto> items) {
        this.items = items;
    }
}
