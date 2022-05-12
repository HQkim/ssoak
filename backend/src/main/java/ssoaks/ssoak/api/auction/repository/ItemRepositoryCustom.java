package ssoaks.ssoak.api.auction.repository;

import org.springframework.data.domain.Pageable;
import ssoaks.ssoak.api.auction.dto.request.ReqSearchDto;
import ssoaks.ssoak.api.auction.dto.response.AuctionListDto;
import ssoaks.ssoak.api.auction.dto.response.ItemOverviewDto;
import ssoaks.ssoak.api.auction.dto.response.ItemOverviewLikedDto;
import ssoaks.ssoak.api.auction.entity.Item;

import java.util.List;

public interface ItemRepositoryCustom {

    List<ItemOverviewDto> getSellingItemOverviewsByMember(Long memberSeq);
    List<ItemOverviewDto> getSoldItemOverviewsByMember(Long memberSeq);
    List<ItemOverviewDto> getUnsoldItemOverviewsByMember(Long memberSeq);
    List<Item> getSoldItemsByMember(Long memberSeq);
    List<ItemOverviewDto> getBoughtItemOverviewsByMember(Long memberSeq);
    List<ItemOverviewLikedDto> getLikedItemOverviewsByMember(Long memberSeq);

    Integer countItemListByAuctionType(String keyword);
    List<AuctionListDto> getItemListByAuctionType(String keyword, Pageable pageable);

    Integer countLiveAuctionBeforeStart(String keyword);
    List<AuctionListDto> getLiveItemListBeforeStart(String keyword, Pageable pageable);

    Integer countSearchItemsByKeyword(ReqSearchDto searchDto, Pageable pageable);
    List<AuctionListDto> getSearchItemsByKeyword(ReqSearchDto searchDto, Pageable pageable);
<<<<<<< Updated upstream
=======

    List<FinishBiddingDto> getSuccessfulAuction();
    List<FinishBiddingDto> getFailedAuction();
>>>>>>> Stashed changes
}
