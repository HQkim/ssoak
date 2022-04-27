package ssoaks.ssoak.api.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
@Table(name = "tb_review")
@Entity
public class Review {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_seq", columnDefinition = "BIGINT UNSIGNED")
    private Long seq;

    @Column(nullable = false, columnDefinition = "INT UNSIGNED")
    private Integer sellerReview;

    @Column(nullable = false, columnDefinition = "INT UNSIGNED")
    private Integer buyerReview;

    // @column의 name을 seller_seq와 buyer_seq로 주는게 맞는지?
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "seller_seq", columnDefinition = "BIGINT UNSIGNED")
    private Member seller;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "buyer_seq", columnDefinition = "BIGINT UNSIGNED")
    private Member buyer;
}
