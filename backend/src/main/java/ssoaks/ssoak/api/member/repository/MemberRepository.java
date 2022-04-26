package ssoaks.ssoak.api.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssoaks.ssoak.api.member.entity.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    @Query("select m from Member m where m.isDeleted=false and m.email=:email and m.kakaoId is null and m.googleId is null")
    Optional<Member> findByEmail(@Param("email") String email);
    @Query("select m from Member m where m.isDeleted=false and m.kakaoId=:kakaoId")
    Optional<Member> findByKakaoId(@Param("kakaoId") String kakaoId);
    @Query("select m from Member m where m.isDeleted=false and m.googleId=:googleId")
    Optional<Member> findByGoogleId(@Param("googleId") String googleId);
    Optional<Member> findByNickname(String nickname);
}
