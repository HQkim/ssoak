package ssoaks.ssoak.api.auction.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.CascadeType.*;
import static lombok.AccessLevel.*;

@Getter
@ToString
@Builder
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
@Table(name = "tb_category")
@Entity
public class Category {

    @Id
    @GeneratedValue
    @Column(name = "category_seq", columnDefinition = "BIGINT UNSIGNED")
    private Long seq;

    @Column(nullable = false)
    private String categoryName;

    // 카테고리의 물품들
    @OneToMany(mappedBy = "category", cascade = ALL)
    private List<ItemCategory> itemCategories = new ArrayList<>();

    // Builder 필요
}
