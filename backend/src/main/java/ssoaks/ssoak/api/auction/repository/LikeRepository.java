package ssoaks.ssoak.api.auction.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssoaks.ssoak.api.auction.entity.Like;

public interface LikeRepository extends JpaRepository<Like, Long> {

    Like findByItemSeqAndMemberSeq(Long itemSeq, Long memberSeq);

    Integer countLikeByItemSeq(Long itemSeq);
}
