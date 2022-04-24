package ssoaks.ssoak.api.auction.entity;

import com.sun.org.apache.xpath.internal.operations.Bool;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ssoaks.ssoak.api.member.entity.Member;

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
public class Bidding {

    @Id
    @GeneratedValue
    @Column(name = "bidding_seq", columnDefinition = "BIGINT UNSIGNED")
    private Long seq;

    @Column(nullable = false, columnDefinition = "INT UNSIGNED")
    private Integer biddingPrice;

    @Column(nullable = false, columnDefinition = "TIMESTAMP")
    private LocalDateTime biddingDate;

    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean isHammered;

    @ManyToOne(fetch = LAZY, cascade = ALL)
    @JoinColumn(name = "item_seq", columnDefinition = "BIGINT UNSIGNED")
    private Item item;

    // @column의 name을 buyer_seq로 주는게 맞는지?
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_seq", columnDefinition = "BIGINT UNSIGNED")
    private Member buyer;


    // Builder

    // changeBidding -> ishammerd update





}