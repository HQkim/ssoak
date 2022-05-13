package ssoaks.ssoak.api.auction.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssoaks.ssoak.api.auction.dto.request.ReqSearchDto;
import ssoaks.ssoak.api.auction.dto.response.AuctionListDto;
import ssoaks.ssoak.api.auction.dto.response.ResAuctionListDto;
import ssoaks.ssoak.api.auction.repository.ItemRepository;
import ssoaks.ssoak.api.member.entity.Member;
import ssoaks.ssoak.api.member.repository.BlockRepository;
import ssoaks.ssoak.api.member.service.MemberService;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class AuctionListServiceImpl implements AuctionListService {

    private final ItemRepository itemRepository;
    private final MemberService memberService;
    private final BlockRepository blockRepository;

    @Override
    public ResAuctionListDto getAuctionList(Boolean token, String keyword, Pageable pageable) {

        log.debug("getAuctionList keyword - {}, page-{}", keyword, pageable);
        Member member = null;
        List<Long> blackList = new ArrayList<>();
        if (token) {
            member = memberService.getMemberByAuthentication();
            System.out.println("memberSeqqqqqqqqqqqq" + member.getSeq());
            blackList = blockRepository.getMyBlackList(member.getSeq());
            System.out.println("blackkkk -" + blackList);
        }
        Integer totalCount = null;
        List<AuctionListDto> auctionList = null;
        for (Sort.Order order : pageable.getSort()) {
            if(order.getProperty().equals("beforeStart")) { // 실시간 경매 예정
                totalCount = itemRepository.countLiveAuctionBeforeStart(blackList, keyword);
                auctionList = itemRepository.getLiveItemListBeforeStart(blackList, keyword, pageable);
            } else {
                totalCount = itemRepository.countItemListByAuctionType(blackList, keyword);
                auctionList = itemRepository.getItemListByAuctionType(blackList, keyword, pageable);

            }
        }
        return ResAuctionListDto.builder()
                .totalCount(totalCount)
                .auctionList(auctionList)
                .build();
    }

    @Override
    public ResAuctionListDto searchAuctionList(Boolean token, Pageable pageable, ReqSearchDto reqSearchDto) {
        log.debug("searchAuctionList reqSearchDto - {}, page-{}", reqSearchDto, pageable);
        Member member = null;
        List<Long> blackList = new ArrayList<>();
        if (token) {
            member = memberService.getMemberByAuthentication();
            System.out.println("memberSeqqqqqqqqqqqq" + member.getSeq());
            blackList = blockRepository.getMyBlackList(member.getSeq());

            System.out.println("blackkkk -" + blackList);
        }

        Integer totalCount = itemRepository.countSearchItemsByKeyword(blackList, reqSearchDto, pageable);
        List<AuctionListDto> searchItems = itemRepository.getSearchItemsByKeyword(blackList, reqSearchDto, pageable);

        return ResAuctionListDto.builder()
                .totalCount(totalCount)
                .auctionList(searchItems)
                .build();
    }
}
