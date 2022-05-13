package ssoaks.ssoak.api.auction.repository;

import org.springframework.data.domain.Pageable;
import ssoaks.ssoak.api.auction.dto.request.FinishBiddingDto;
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
    List<ItemOverviewLikedDto> getLikedItemOverviewsByMember(Long memberSeq, List<Long> blackList);

    Integer countItemListByAuctionType(List<Long> blackList, String keyword);
    List<AuctionListDto> getItemListByAuctionType(List<Long> blackList, String keyword, Pageable pageable);

    Integer countLiveAuctionBeforeStart(List<Long> blackList, String keyword);
    List<AuctionListDto> getLiveItemListBeforeStart(List<Long> blackList, String keyword, Pageable pageable);

    Integer countSearchItemsByKeyword(List<Long> blackList, ReqSearchDto searchDto, Pageable pageable);
    List<AuctionListDto> getSearchItemsByKeyword(List<Long> blackList, ReqSearchDto searchDto, Pageable pageable);

    List<FinishBiddingDto> getSuccessfulAuction();
    List<FinishBiddingDto> getFiledAuction();


}
