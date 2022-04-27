package ssoaks.ssoak.api.auction.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssoaks.ssoak.api.auction.dto.request.ReqItemRegisterDto;
import ssoaks.ssoak.api.auction.entity.Category;
import ssoaks.ssoak.api.auction.entity.Item;
import ssoaks.ssoak.api.auction.entity.ItemCategory;
import ssoaks.ssoak.api.auction.enums.AuctionType;
//import ssoaks.ssoak.api.auction.repository.CategoryRepository;
import ssoaks.ssoak.api.auction.repository.CategoryRepository;
import ssoaks.ssoak.api.auction.repository.ItemCategoryRepository;
import ssoaks.ssoak.api.auction.repository.ItemRepository;
import ssoaks.ssoak.api.member.entity.Member;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
public class AuctionServiceImpl implements AuctionService {

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    ItemCategoryRepository itemCategoryRepository;

    @Transactional
    @Override
    public Boolean createItem(Member member, ReqItemRegisterDto itemRegisterRequestDto) {

        LocalDateTime startTime = null;

        if (itemRegisterRequestDto.getAuctionType().equals(AuctionType.NORMAL)){
            startTime = LocalDateTime.now();
        }
        else if (itemRegisterRequestDto.getAuctionType().equals(AuctionType.LIVE)) {
            startTime = itemRegisterRequestDto.getStartTime();
        }
        // 아이템 등록
        Item item = Item.builder()
                .title(itemRegisterRequestDto.getTitle())
                .content(itemRegisterRequestDto.getContent())
                .startPrice(itemRegisterRequestDto.getStartPrice())
                .biddingUnit((int) Math.round(itemRegisterRequestDto.getStartPrice()*0.1))
                .startTime(startTime)
                .endTime(itemRegisterRequestDto.getEndTime())
                .auctionType(itemRegisterRequestDto.getAuctionType())
                .isSold(false)
                .member(member)
                .build();
        itemRepository.save(item);

        // 카테고리 등록
        for (String cate : itemRegisterRequestDto.getItemCategories()) {
            Category category = categoryRepository.findByCategoryName(cate).get();

            ItemCategory itemCategory = ItemCategory.builder()
                    .category(category)
                    .item(item)
                    .build();
            itemCategoryRepository.save(itemCategory);
        }

        return true;
        // image upload 함수 생성

    }

}
