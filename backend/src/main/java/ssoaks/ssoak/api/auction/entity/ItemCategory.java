package ssoaks.ssoak.api.auction.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssoaks.ssoak.api.member.entity.Member;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;
import static lombok.AccessLevel.*;

@Getter
@NoArgsConstructor(access = PROTECTED)
@Table(name = "tb_item_category")
@Entity
public class ItemCategory {

    @Id
    @GeneratedValue
    @Column(name = "item_category_seq", columnDefinition = "BIGINT UNSIGNED")
    private Long seq;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "category_seq", columnDefinition = "BIGINT UNSIGNED")
    private Category category;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "item_seq", columnDefinition = "BIGINT UNSIGNED")
    private Item item;

    // category 수정 필요한지 확인해야함
}
