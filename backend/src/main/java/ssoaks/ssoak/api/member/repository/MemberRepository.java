package ssoaks.ssoak.api.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssoaks.ssoak.api.member.entity.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    @Query("select m from Member m where m.isDeleted=false and m.kakaoId=:kakaoId")
    Optional<Member> findByKakaoId(@Param("kakaoId") String kakaoId);

    @Query("select m from Member m where m.isDeleted=false and m.googleId=:googleId")
    Optional<Member> findByGoogleId(@Param("googleId") String googleId);

    Optional<Member> findBySeq(Long memberSeq);

}
