package ssoaks.ssoak.api.auction.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssoaks.ssoak.api.auction.dto.response.ItemSimpleOverviewDto;
import ssoaks.ssoak.api.auction.repository.ItemRepository;
import ssoaks.ssoak.api.member.service.MemberService;

import java.awt.print.Pageable;
import java.util.List;

@Slf4j
@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class AuctionListServiceImpl implements AuctionListService {

    private final ItemRepository itemRepository;
    private final MemberService memberService;


    @Override
    public List<ItemSimpleOverviewDto> getAuctionList(Pageable pageable, String keyword) {

        if (keyword == "underway") {

        }
        return null;
    }
}
