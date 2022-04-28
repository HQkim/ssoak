package ssoaks.ssoak.api.auction.entity;


import lombok.Getter;
import lombok.NoArgsConstructor;
import static lombok.AccessLevel.*;


import javax.persistence.*;
import static javax.persistence.FetchType.LAZY;

import ssoaks.ssoak.api.member.entity.Member;


@Getter
@NoArgsConstructor(access = PROTECTED)
@Table(name = "tb_like")
@Entity
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_seq", columnDefinition = "BIGINT UNSIGNED")
    private Long seq;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_seq", columnDefinition = "BIGINT UNSIGNED")
    private Member member;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "item_seq", columnDefinition = "BIGINT UNSIGNED")
    private Item item;

}
