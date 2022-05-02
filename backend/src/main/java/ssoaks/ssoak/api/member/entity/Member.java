package ssoaks.ssoak.api.member.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;


import javax.persistence.*;
import java.time.LocalDateTime;

import static lombok.AccessLevel.*;


@Entity
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = PROTECTED)
@Table(name = "tb_member")
@Getter
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @CreatedDate
    private LocalDateTime signupTime;

    @LastModifiedDate // 이거 빼야함
    private LocalDateTime loginTime;

    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean isDeleted;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Builder
    public Member(String kakaoId, String googleId, String email, String nickname, String profileImageUrl,
                  Double grade, Boolean isDeleted, String password
                  ) {
        this.kakaoId = kakaoId;
        this.googleId = googleId;
        this.email = email;
        this.nickname = nickname;
        this.profileImageUrl = profileImageUrl;
        this.grade = grade;
        this.isDeleted = isDeleted;
        this.password = password;
    }

    public void deleteMember() {
        if(!this.isDeleted) {
            this.isDeleted = true;
        }
    }
}