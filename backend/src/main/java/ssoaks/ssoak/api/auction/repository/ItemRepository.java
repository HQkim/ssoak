package ssoaks.ssoak.api.auction.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssoaks.ssoak.api.auction.entity.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {



}
