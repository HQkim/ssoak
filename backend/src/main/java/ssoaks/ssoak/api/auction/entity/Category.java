package ssoaks.ssoak.api.auction.entity;

import lombok.*;

import javax.persistence.*;

import static lombok.AccessLevel.*;

@Getter
@ToString
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
@Table(name = "tb_category")
@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_seq", columnDefinition = "BIGINT UNSIGNED")
    private Long seq;

    @Column(nullable = false)
    private String categoryName;

}
