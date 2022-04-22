package ssoaks.ssoak.common.entity.chat;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssoaks.ssoak.api.auction.entity.Item;
import ssoaks.ssoak.api.member.entity.Member;
import ssoaks.ssoak.common.entity.base.BaseCreatedEntity;

import javax.persistence.*;

import static javax.persistence.FetchType.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tb_chat")
@Entity
public class Chat extends BaseCreatedEntity {

    @Column(name = "chat_seq", columnDefinition = "BIGINT UNSIGNED")
    @GeneratedValue
    @Id
    private Long seq;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "item_seq", columnDefinition = "BIGINT UNSIGNED")
    private Item item;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @JoinColumn(name = "seller_seq", nullable = false)
    @ManyToOne(fetch = LAZY)
    private Member seller;

    @JoinColumn(name = "buyer_seq", nullable = false)
    @ManyToOne(fetch = LAZY)
    private Member buyer;
}