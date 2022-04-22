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
@Table(name = "tb_like")
@Entity
public class Like {

    @Id
    @GeneratedValue
    @Column(name = "like_seq", columnDefinition = "BIGINT UNSIGNED")
    private Long seq;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_seq", columnDefinition = "BIGINT UNSIGNED")
    private Member member;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "item_seq", columnDefinition = "BIGINT UNSIGNED")
    private Item item;

}
