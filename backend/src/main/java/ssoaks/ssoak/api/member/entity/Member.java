package ssoaks.ssoak.api.member.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssoaks.ssoak.api.auction.entity.Item;
import ssoaks.ssoak.api.auction.entity.Like;
import ssoaks.ssoak.api.auction.enums.TradeType;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.CascadeType.*;
import static lombok.AccessLevel.*;

@Getter
@NoArgsConstructor(access = PROTECTED)
@Table(
        name = "tb_member",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "email")
        }
)
@Entity
public class Member {

    @Id
    @GeneratedValue
    @Column(name = "member_seq", columnDefinition = "BIGINT UNSIGNED")
    private Long seq;

    @Column
    private String kakaoId;

    @Column
    private String googleId;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String profileImageUrl;

    @Column(nullable = false)
    private Double grade;

    @Column(nullable = false)
    private LocalDateTime signupTime;

    @Column(nullable = false)
    private LocalDateTime loginTime;

    // 내가 like한 물품들
    @OneToMany(mappedBy = "member", cascade = ALL)
    private List<Like> likes = new ArrayList<>();

    // 내가 판매자인 물품들 (쓰일지 모르겠음)
    @OneToMany(mappedBy = "member", cascade = ALL)
    private List<Item> sellingItems = new ArrayList<>();

}