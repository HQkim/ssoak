package ssoaks.ssoak.api.auction.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import static lombok.AccessLevel.*;

import javax.persistence.*;
import static javax.persistence.FetchType.LAZY;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = PROTECTED)
@Table(name = "tb_item_category")
@Entity
public class ItemCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_category_seq", columnDefinition = "BIGINT UNSIGNED")
    private Long seq;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "category_seq", columnDefinition = "BIGINT UNSIGNED")
    private Category category;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "item_seq", columnDefinition = "BIGINT UNSIGNED")
    private Item item;

    // 물품 수정 - 카테고리 수정
    public void changeItemCategory(Category category) {
        this.category = category;
    }
}
