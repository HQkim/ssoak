package ssoaks.ssoak.api.auction.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssoaks.ssoak.api.auction.entity.Item;
import ssoaks.ssoak.api.auction.entity.Like;
import ssoaks.ssoak.api.auction.repository.ItemRepository;
import ssoaks.ssoak.api.auction.repository.LikeRepository;
import ssoaks.ssoak.api.member.entity.Member;
import ssoaks.ssoak.api.member.repository.MemberRepository;
import ssoaks.ssoak.api.member.service.MemberService;

@Slf4j
@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {

    private final LikeRepository likeRepository;

    private final ItemRepository itemRepository;

    private final MemberRepository memberRepository;

    private final MemberService memberService;

    @Transactional
    @Override
    public void like(Long itemSeq) throws Exception {

        log.debug("like Item - {}", itemSeq);
        Member member = memberService.getMemberByAuthentication();
        System.out.println("like - memberSeq - " + member.getSeq());

        Like findLike = likeRepository.findByItemSeqAndMemberSeq(member.getSeq(), itemSeq);

        if(findLike == null) {
            Item item = itemRepository.findBySeq(itemSeq)
                    .orElseThrow(() -> new IllegalArgumentException("물품을 찾을 수 없습니다."));

            likeRepository.save(Like.builder()
                    .item(item)
                    .member(member)
                    .build());
        } else {
            log.error("Like Item error -{}", itemSeq);
            throw new Exception("요청을 수행할 수 없습니다.");
        }

    }

    @Transactional
    @Override
    public void unLike(Long itemSeq) {

        log.debug("unlike Item - {}", itemSeq);
        Member member = memberService.getMemberByAuthentication();

        Like findLike = likeRepository.findByItemSeqAndMemberSeq(member.getSeq(), itemSeq);

        if (findLike == null) {
            throw new IllegalStateException("좋아요한 물품을 찾을 수 없습니다.");
        } else if (findLike.getMember().getSeq().equals(member.getSeq())) {
            likeRepository.delete(findLike);
        } else {
            log.error("unLike Item error - {}", itemSeq);
        }
    }

    @Override
    public Boolean isLike(Long memberSeq, Long itemSeq) {

        Like findLike = likeRepository.findByItemSeqAndMemberSeq(memberSeq, itemSeq);
        return findLike != null;
    }
}
