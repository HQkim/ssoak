package ssoaks.ssoak.api.auction.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssoaks.ssoak.api.auction.entity.Image;
import ssoaks.ssoak.api.auction.entity.Item;

import java.util.List;
import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Long> {

    Optional<List<Image>> findByItemSeqOrderBySeq (Long itemSeq);

}
