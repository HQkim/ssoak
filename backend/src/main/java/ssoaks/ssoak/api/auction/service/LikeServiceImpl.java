package ssoaks.ssoak.api.auction.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssoaks.ssoak.api.auction.entity.Item;
import ssoaks.ssoak.api.auction.entity.Like;
import ssoaks.ssoak.api.auction.repository.ItemRepository;
import ssoaks.ssoak.api.auction.repository.LikeRepository;
import ssoaks.ssoak.api.member.entity.Member;
import ssoaks.ssoak.api.member.repository.MemberRepository;

@Slf4j
@Transactional(readOnly = true)
@Service
public class LikeServiceImpl implements LikeService {

    @Autowired
    LikeRepository likeRepository;

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    MemberRepository memberRepository;

    @Transactional
    @Override
    public void like(Member member, Long itemSeq) throws Exception {
        Like findLike = likeRepository.findByItemSeqAndMemberSeq(itemSeq, member.getSeq());

        if(findLike == null) {
            Item item = itemRepository.findBySeq(itemSeq)
                    .orElseThrow(() -> new IllegalArgumentException("물품을 찾을 수 없습니다."));

            // memberDto로 Refactoring 후 변경 예정
            Member memberTmp = memberRepository.findById(member.getSeq())
                    .orElseThrow(() -> new IllegalArgumentException("회원을 찾을 수 없습니다."));

            likeRepository.save(Like.builder()
                    .item(item)
                    .member(memberTmp)
                    .build());
        } else {
            log.error("Like Item error -{}", itemSeq);
            throw new Exception("요청을 수행할 수 없습니다.");
        }

    }

    @Transactional
    @Override
    public void unLike(Member member, Long itemSeq) {
        Like findLike = likeRepository.findByItemSeqAndMemberSeq(itemSeq, member.getSeq());
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
