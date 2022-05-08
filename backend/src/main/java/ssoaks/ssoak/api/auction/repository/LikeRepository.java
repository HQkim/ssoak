package ssoaks.ssoak.api.auction.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssoaks.ssoak.api.auction.entity.Like;

import java.util.List;

public interface LikeRepository extends JpaRepository<Like, Long> {

    Like findByItemSeqAndMemberSeq(Long memberSeq, Long itemSeq);

    Integer countLikeByItemSeq(Long itemSeq);

    List<Like> findAllByItemSeq(Long itemSeq);
}
