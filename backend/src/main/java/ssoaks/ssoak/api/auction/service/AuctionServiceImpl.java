package ssoaks.ssoak.api.auction.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import ssoaks.ssoak.api.auction.dto.request.ReqItemRegisterDto;
import ssoaks.ssoak.api.auction.dto.response.ResItemDto;
import ssoaks.ssoak.api.auction.entity.Category;
import ssoaks.ssoak.api.auction.entity.Image;
import ssoaks.ssoak.api.auction.entity.Item;
import ssoaks.ssoak.api.auction.entity.ItemCategory;
import ssoaks.ssoak.api.auction.enums.AuctionType;
import ssoaks.ssoak.api.auction.repository.*;
import ssoaks.ssoak.api.member.dto.response.MemberSimpleInfoDto;
import ssoaks.ssoak.api.member.entity.Member;
import ssoaks.ssoak.api.member.repository.MemberRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Transactional(readOnly = true)
@Service
public class AuctionServiceImpl implements AuctionService {

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    ItemCategoryRepository itemCategoryRepository;

    @Autowired
    LikeRepository likeRepository;

    @Autowired
    LikeService likeService;

    @Autowired
    ImageRepository imageRepository;

    @Autowired
    AwsS3Service awsS3Service;

    @Transactional
    @Override
    public Boolean createItem(Member member, ReqItemRegisterDto itemRegisterRequestDto, List<MultipartFile> itemImages) {

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



        // image upload
        uploadItemImages(item, itemImages);

        return true;
    }


    @Override
    public ResItemDto getItemDetail(Long memberSeq, Long itemSeq) {
        Item item = itemRepository.findById(itemSeq)
                .orElseThrow(() -> new IllegalArgumentException("해당 물품을 찾을 수 없습니다."));

        // 카테고리
        List<ItemCategory> itemCategories = itemCategoryRepository.findByItem(item)
                .orElseThrow(() -> new IllegalArgumentException("해당 물품에 대한 카테고리를 찾을 수 없습니다."));

        List<String> categories = itemCategories.stream()
                .map(itemCategory -> itemCategory.getCategory().getCategoryName())
                .collect(Collectors.toList());

        //member
        Optional<Member> member = memberRepository.findBySeq(memberSeq);

        MemberSimpleInfoDto memberDto = MemberSimpleInfoDto.builder()
                .seq(member.get().getSeq())
                .nickname(member.get().getNickname())
                .profileImageUrl(member.get().getProfileImageUrl())
                .build();

        // 이미지
        List<Image> itemImages = imageRepository.findByItemSeqOrderBySeq(itemSeq)
                .orElseThrow(() -> new IllegalArgumentException("해당 물품에 대한 이미지를 찾을 수 없습니다."));

        List<String> images = itemImages.stream()
                .map(Image::getImageUrl)
                .collect(Collectors.toList());


        // 입찰정보

        // 좋아요
        Boolean like = likeService.isLike(memberSeq, itemSeq);
        Integer cntLike = likeRepository.countLikeByItemSeq(itemSeq);


        ResItemDto resItemDto = ResItemDto.builder()
                .title(item.getTitle())
                .content(item.getContent())
                .startPrice(item.getStartPrice())
                .biddingUnit(item.getBiddingUnit())
                .startTime(item.getStartTime())
                .endTime(item.getEndTime())
                .auctionType(item.getAuctionType())
                .isSold(item.getIsSold())
                .member(memberDto)
                .isLike(like)
                .likeCount(cntLike)
                .itemCategories(categories)
                .itemImages(images)
                .build();

        return resItemDto;
    }

    @Override
    public void uploadItemImages(Item item, List<MultipartFile> itemImages) {

        itemImages.forEach(image -> {

            String imageUrl = awsS3Service.uploadImage(image);
            Image imageBuild = Image.builder()
                    .imageUrl(imageUrl)
                    .item(item)
                    .build();
            imageRepository.save(imageBuild);
        });
    }

}
