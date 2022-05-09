package ssoaks.ssoak.api.auction.entity;

import lombok.*;
import ssoaks.ssoak.api.auction.enums.AuctionType;
import ssoaks.ssoak.api.member.entity.Member;
import ssoaks.ssoak.common.entity.base.BaseModifiedEntity;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.CascadeType.*;
import static javax.persistence.FetchType.LAZY;
import static lombok.AccessLevel.*;

@Getter
@ToString(of = {"seq", "title", "content", "startPrice", "biddingUnit", "biddingPrice", "biddingCount","startTime", "endTime", "auctionType", "isSold"})
@NoArgsConstructor(access = PROTECTED)
@Table(name = "tb_item")
@Entity
public class Item extends BaseModifiedEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_seq", columnDefinition = "BIGINT UNSIGNED")
    private Long seq;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false, columnDefinition = "INT UNSIGNED")
    private Integer startPrice;

    @Column(nullable = false, columnDefinition = "INT UNSIGNED")
    private Integer biddingUnit;

    @Column(columnDefinition = "INT UNSIGNED")
    private Integer biddingPrice;

    @Column(columnDefinition = "INT UNSIGNED")
    private Integer biddingCount;

    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime startTime;

    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime endTime;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private AuctionType auctionType;

    @Column(columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean isSold;

    @Column(columnDefinition = "INT UNSIGNED")
    private Float sellerReview;

    @Column(columnDefinition = "INT UNSIGNED")
    private Float buyerReview;

    // 물품의 입찰 정보들
    @OneToMany(mappedBy = "item", cascade = ALL)
    private List<Bidding> biddings = new ArrayList<>();

    // 물품에 대한 좋아요 (added by Hyunkyu - querydsl에서 필요)
    @OneToMany(mappedBy = "item", cascade = ALL)
    private List<Like> likes = new ArrayList<>();

    // 물품 사진들(added by Hyunkyu - querydsl에서 필요)
    @OneToMany(mappedBy = "item", cascade = ALL)
    private List<Image> images = new ArrayList<>();

    // 물품의 판매자
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "seller_seq", columnDefinition = "BIGINT UNSIGNED")
    private Member member;

    // 물품 입찰자
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "buyer_seq", columnDefinition = "BIGINT UNSIGNED")
    private Member buyer;

    @Builder
    public Item(String title, String content, Integer startPrice, Integer biddingUnit,
                Integer biddingPrice, Integer biddingCount, LocalDateTime startTime,
                LocalDateTime endTime, AuctionType auctionType, Boolean isSold, Member member) {
        this.title = title;
        this.content = content;
        this.startPrice = startPrice;
        this.biddingUnit = biddingUnit;
        this.biddingPrice = biddingPrice;
        this.biddingCount = biddingCount;
        this.startTime = startTime;
        this.endTime = endTime;
        this.auctionType = auctionType;
        this.isSold = isSold;
        this.member = member;
        this.buyer = null;
        this.sellerReview = null;
        this.buyerReview = null;
    }


    public void changeItem(String title, String content, Integer startPrice,
                           Integer biddingUnit, LocalDateTime startTime, LocalDateTime endTime,
                           AuctionType auctionType) {
        this.title = title;
        this.content = content;
        this.startPrice = startPrice;
        this.biddingUnit = biddingUnit;
        this.startTime = startTime;
        this.endTime = endTime;
        this.auctionType = auctionType;
    }

    public void updateBiddingItem(Integer biddingPrice, Member buyer) {
        this.biddingPrice = biddingPrice;
        this.biddingCount += 1;
        this.buyer = buyer;
    }

    public void successBiddingItem(LocalDateTime endTime, Boolean isSold, Member buyer) {
        this.endTime = endTime;
        this.isSold = isSold;
        this.buyer = buyer;
    }

    public void updateSellerReview(Float sellerReview) {
        this.sellerReview = sellerReview;
    }

    public void updateBuyerReview(Float buyerReview) {
        this.buyerReview = buyerReview;
    }

}