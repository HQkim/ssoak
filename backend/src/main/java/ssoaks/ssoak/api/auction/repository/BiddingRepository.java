package ssoaks.ssoak.api.auction.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssoaks.ssoak.api.auction.entity.Bidding;

import java.util.Optional;

public interface BiddingRepository extends JpaRepository<Bidding, Long>, BiddingRepositoryCustom {

    Optional<Bidding> findByItemSeqOrderBySeqDesc(Long itemSeq);

    Bidding findByItemSeq(Long itemSeq);

}
