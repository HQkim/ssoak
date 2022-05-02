package ssoaks.ssoak.api.auction.repository;

import ssoaks.ssoak.api.auction.dto.response.ItemOverviewDto;
import ssoaks.ssoak.api.auction.entity.Item;

import java.util.List;

public interface ItemRepositoryCustom {

    List<ItemOverviewDto> getSellingItemOverviewsByMember(Long memberSeq);
    List<ItemOverviewDto> getSoldItemOverviewsByMember(Long memberSeq);
    List<ItemOverviewDto> getUnsoldItemOverviewsByMember(Long memberSeq);
    List<Item> getSoldItemsByMember(Long memberSeq);
    List<ItemOverviewDto> getBoughtItemOverviewsByMember(Long memberSeq);
}
