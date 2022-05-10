package ssoaks.ssoak.api.auction.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssoaks.ssoak.api.auction.dto.request.ReqAuctionReviewDto;
import ssoaks.ssoak.api.auction.entity.Item;
import ssoaks.ssoak.api.auction.repository.ItemRepository;
import ssoaks.ssoak.api.member.entity.Member;
import ssoaks.ssoak.api.member.service.MemberService;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService{

    private final MemberService memberService;

    private final ItemRepository itemRepository;

    @Override
    public Boolean updateReview(Long itemSeq, ReqAuctionReviewDto reviewDto) {
        log.debug("creaetReview seq- {}, review - {}", itemSeq, reviewDto);
        Member member = memberService.getMemberByAuthentication();

        Item item = itemRepository.findBySeq(itemSeq)
                .orElseThrow(() -> new IllegalStateException("물품 조회 실패"));
        if (item.getBuyer() == null) {
            return false;
        }

        Float grade = updateGrade(reviewDto.getReview());

        if (item.getMember().getSeq().equals(member.getSeq())) {
            item.updateSellerReview(reviewDto.getReview());
            member.updateReview(3f);
            item.getBuyer().updateReview(grade);
        } else if (item.getBuyer().getSeq().equals(member.getSeq())) {
            item.updateBuyerReview(reviewDto.getReview());
            member.updateReview(3f);
            item.getMember().updateReview(grade);
        }
        return true;
    }

    public Float updateGrade(Float review) {
        float grade = 0f;
        if (review <= 1) {
            grade = -2f;
        } else if(review <= 2f) {
            grade = -1f;
        } else if(review <= 3) {
            grade = 0f;
        } else if (review <= 4) {
            grade = 1f;
        } else if (review <=5) {
            grade = 2f;
        }
        return grade;
    }
}
