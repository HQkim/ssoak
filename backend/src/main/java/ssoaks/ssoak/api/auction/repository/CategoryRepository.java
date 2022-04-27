package ssoaks.ssoak.api.auction.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssoaks.ssoak.api.auction.entity.Category;
import java.util.List;
import java.util.Optional;


public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("SELECT c FROM Category c where c.categoryName = :categoryName")
    Optional<Category> findByCategoryName(@Param("categoryName") String categoryName);

}
