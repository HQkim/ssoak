package ssoaks.ssoak.api.auction.entity;

import lombok.*;
import ssoaks.ssoak.common.entity.base.BaseModifiedEntity;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;
import static lombok.AccessLevel.*;


@Getter
@ToString
@NoArgsConstructor(access = PROTECTED) // 이거 같이 쓰는 이유.알아봐야함..
@Table(name = "tb_image")
@Entity
public class Image extends BaseModifiedEntity {

    @Id
    @GeneratedValue
    @Column(name = "image_seq", columnDefinition = "BIGINT UNSIGNED")
    private Long seq;

    @Column(nullable = false)
    private String imageUrl;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "item_seq", columnDefinition = "BIGINT UNSIGNED")
    private Item item;


    // image 수정 change Image

}
