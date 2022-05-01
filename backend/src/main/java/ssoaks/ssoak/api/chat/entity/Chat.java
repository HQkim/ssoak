package ssoaks.ssoak.api.chat.entity;

import lombok.AccessLevel;
import lombok.Builder;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @Builder
    public Chat(Item item, String content, Member seller, Member buyer) {
        this.item = item;
        this.content = content;
        this.seller = seller;
        this.buyer = buyer;
    }
}