package ssoaks.ssoak.api.auction.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssoaks.ssoak.api.auction.entity.Item;
import ssoaks.ssoak.api.auction.entity.ItemCategory;

import java.util.List;
import java.util.Optional;

public interface ItemCategoryRepository extends JpaRepository<ItemCategory, Long> {

    Optional<List<ItemCategory>> findByItem (Item item);

}
