package ssoaks.ssoak.api.auction.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ssoaks.ssoak.api.member.entity.Member;
import ssoaks.ssoak.common.entity.base.BaseCreatedEntity;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.FetchType.LAZY;
import static lombok.AccessLevel.*;

@Getter
@ToString
@NoArgsConstructor(access = PROTECTED)
@Table(name = "tb_bidding")
@Entity
public class Bidding extends BaseCreatedEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bidding_seq", columnDefinition = "BIGINT UNSIGNED")
    private Long seq;

    @Column(nullable = false, columnDefinition = "INT UNSIGNED")
    private Integer biddingPrice;

    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean isHammered;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "item_seq", columnDefinition = "BIGINT UNSIGNED")
    private Item item;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_seq", columnDefinition = "BIGINT UNSIGNED")
    private Member buyer;

    @Builder
    public Bidding(Integer biddingPrice, Boolean isHammered, Item item, Member buyer) {
        this.biddingPrice = biddingPrice;
        this.isHammered = isHammered;
        this.item = item;
        this.buyer = buyer;
    }

    public void successBidding(Boolean isHammered) {
        this.isHammered = isHammered;
    }


}