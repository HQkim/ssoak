package ssoaks.ssoak.api.auction.service;

import lombok.RequiredArgsConstructor;
import com.amazonaws.services.dynamodbv2.xspec.M;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import ssoaks.ssoak.api.auction.dto.request.ReqItemRegisterDto;
import ssoaks.ssoak.api.auction.dto.response.BiddingDto;
import ssoaks.ssoak.api.auction.dto.response.ResItemDto;
import ssoaks.ssoak.api.auction.entity.*;
import ssoaks.ssoak.api.auction.enums.AuctionType;
import ssoaks.ssoak.api.auction.repository.*;
import ssoaks.ssoak.api.member.dto.response.MemberSimpleInfoDto;
import ssoaks.ssoak.api.member.entity.Member;
import ssoaks.ssoak.api.member.repository.MemberRepository;
import ssoaks.ssoak.api.member.service.MemberService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class AuctionServiceImpl implements AuctionService {

    private final CategoryRepository categoryRepository;

    private final ItemRepository itemRepository;

    private final MemberRepository memberRepository;

    private final ItemCategoryRepository itemCategoryRepository;

    private final LikeRepository likeRepository;

    private final LikeService likeService;

    private final ImageRepository imageRepository;

    private final AwsS3Service awsS3Service;

    private final MemberService memberService;

    private final BiddingRepository biddingRepository;

    @Transactional
    @Override
    public Boolean createItem(ReqItemRegisterDto itemRegisterRequestDto, List<MultipartFile> itemImages) {

        log.debug("registerItem - {}", itemRegisterRequestDto);
        Member member = memberService.getMemberByAuthentication();

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
    public ResItemDto getItemDetail(Long itemSeq) {

        log.debug("getItem - {}", itemSeq);
        Member member = memberService.getMemberByAuthentication();

        System.out.println("============item============");
        Item item = itemRepository.findById(itemSeq)
                .orElseThrow(() -> new IllegalArgumentException("해당 물품을 찾을 수 없습니다."));

        System.out.println("============category============");

        // category
        List<ItemCategory> itemCategories = itemCategoryRepository.findByItem(item)
                .orElseThrow(() -> new IllegalArgumentException("해당 물품에 대한 카테고리를 찾을 수 없습니다."));

        List<String> categories = itemCategories.stream()
                .map(itemCategory -> itemCategory.getCategory().getCategoryName())
                .collect(Collectors.toList());


        // member -> 조회한 유저
        MemberSimpleInfoDto memberDto = MemberSimpleInfoDto.builder()
                .seq(member.getSeq())
                .nickname(member.getNickname())
                .profileImageUrl(member.getProfileImageUrl())
                .build();

        System.out.println("=====seller======");
        MemberSimpleInfoDto seller = MemberSimpleInfoDto.builder()
                .seq(item.getMember().getSeq())
                .nickname(item.getMember().getNickname())
                .profileImageUrl(item.getMember().getProfileImageUrl())
                .build();

        System.out.println("=========images==========");
        // images
        List<Image> itemImages = imageRepository.findByItemSeqOrderBySeq(itemSeq)
                .orElseThrow(() -> new IllegalArgumentException("해당 물품에 대한 이미지를 찾을 수 없습니다."));

        List<String> images = itemImages.stream()
                .map(Image::getImageUrl)
                .collect(Collectors.toList());


        // 입찰정보 - 입찰가, 입찰한 사람에 대한 SimpleDto
        System.out.println("======bidding=======");
        Bidding bidding = biddingRepository.findByItemSeqOrderBySeqDesc(itemSeq).orElse(null);

        BiddingDto biddingDto = null;


        if (bidding != null) {

            MemberSimpleInfoDto buyer = MemberSimpleInfoDto.builder()
                    .seq(bidding.getBuyer().getSeq())
                    .nickname(bidding.getBuyer().getNickname())
                    .profileImageUrl(bidding.getBuyer().getProfileImageUrl())
                    .build();

            biddingDto = BiddingDto.builder()
                    .biddingPrice(bidding.getBiddingPrice())
                    .biddingDate(bidding.getBiddingDate())
                    .buyer(buyer)
                    .build();

        }


        System.out.println("=========like===========");
        // like
        Boolean like = likeService.isLike(member.getSeq(), itemSeq);
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
                .bidding(biddingDto)
                .seller(seller)
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
