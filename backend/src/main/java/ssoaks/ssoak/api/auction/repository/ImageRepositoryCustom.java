package ssoaks.ssoak.api.auction.repository;

import ssoaks.ssoak.api.auction.dto.response.ItemImageSimpleInfoDto;
import ssoaks.ssoak.api.auction.entity.Image;

import java.util.List;

public interface ImageRepositoryCustom {

    List<ItemImageSimpleInfoDto> getSellingItemsImagesByMember(Long memberSeq);

    List<ItemImageSimpleInfoDto> getSoldItemsImagesByMember(Long memberSeq);

    List<ItemImageSimpleInfoDto> getUnsoldItemsImagesByMember(Long memberSeq);

    List<ItemImageSimpleInfoDto> getBoughtItemsImagesByMember(Long memberSeq);

    List<ItemImageSimpleInfoDto> getLikedItemsImagesByMember(Long memberSeq);
}
