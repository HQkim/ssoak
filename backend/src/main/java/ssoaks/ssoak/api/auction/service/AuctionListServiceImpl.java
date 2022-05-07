package ssoaks.ssoak.api.auction.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssoaks.ssoak.api.auction.dto.response.AuctionListDto;
import ssoaks.ssoak.api.auction.dto.response.ItemSimpleOverviewDto;
import ssoaks.ssoak.api.auction.dto.response.ResAuctionListDto;
import ssoaks.ssoak.api.auction.repository.ItemRepository;
import ssoaks.ssoak.api.member.service.MemberService;

import java.util.List;

@Slf4j
@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class AuctionListServiceImpl implements AuctionListService {

    private final ItemRepository itemRepository;
    private final MemberService memberService;


    @Override
    public ResAuctionListDto getAuctionList(String keyword, Pageable pageable) {

        Integer totalCount = itemRepository.countItemListByAuctionType(keyword);
        List<AuctionListDto> itemList = itemRepository.getItemListByAuctionType(keyword, pageable);

        ResAuctionListDto auctionListDto = ResAuctionListDto.builder()
                .totalCount(totalCount)
                .auctionList(itemList)
                .build();

        return auctionListDto;

    }
}
