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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_seq", columnDefinition = "BIGINT UNSIGNED")
    private Long seq;

    @Column(nullable = false)
    private String imageUrl;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "item_seq", columnDefinition = "BIGINT UNSIGNED")
    private Item item;

    @Builder
    public Image(String imageUrl, Item item) {
        this.imageUrl = imageUrl;
        this.item = item;
    }

    public void changeImage(String imageUrl, Item item) {
        this.imageUrl = imageUrl;
    }

    // 기존 이미지  - FILE -> imageURl은 내가생성해..그럼 url을 가지고 있겠지. 수정
    // list에서 수정 되지 않은 값 -> front가 줘야 함
    // 수정된 값 -> File로 보내줘야겠지...

    // 기존  a b c - 1 -> findAllByItemSeq 로 찾아와
    // 수정 a b d e - 1  -> .contains로 abde를 검색
    // (ab가 나와 -> c가 없네!? 그럼 c 삭제 ,
    // + d, e 는 추가
}
