package ssoaks.ssoak.api.member.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssoaks.ssoak.common.entity.base.BaseCreatedEntity;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PROTECTED;

@Getter
@NoArgsConstructor(access = PROTECTED)
@Table(name = "tb_block")
@Entity
public class Block extends BaseCreatedEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "block_seq", columnDefinition = "BIGINT UNSIGNED")
    private Long seq;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "reporter_seq", columnDefinition = "BIGINT UNSIGNED")
    private Member reporter;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_seq", columnDefinition = "BIGINT UNSIGNED")
    private Member member;

    @Builder
    public Block(Member reporter, Member member) {
        this.reporter = reporter;
        this.member = member;
    }
}
