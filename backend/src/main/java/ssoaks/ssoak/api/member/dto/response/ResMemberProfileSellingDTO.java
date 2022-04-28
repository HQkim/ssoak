package ssoaks.ssoak.api.member.dto.response;

import lombok.Builder;
import lombok.Getter;
import ssoaks.ssoak.api.auction.dto.response.ItemOverviewDto;

import java.util.List;

@Getter
public class ResMemberProfileSellingDTO {

    private List<ItemOverviewDto> itemOverviewDtos;

    @Builder
    public ResMemberProfileSellingDTO(List<ItemOverviewDto> itemOverviewDtos) {
        this.itemOverviewDtos = itemOverviewDtos;
    }
}
