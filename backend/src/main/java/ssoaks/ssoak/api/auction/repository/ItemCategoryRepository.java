package ssoaks.ssoak.api.auction.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssoaks.ssoak.api.auction.entity.ItemCategory;

import java.util.Optional;

public interface ItemCategoryRepository extends JpaRepository<ItemCategory, Long> {

    @Override
    Optional<ItemCategory> findById(Long aLong);
}
