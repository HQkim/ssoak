package ssoaks.ssoak.api.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssoaks.ssoak.api.member.entity.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long>, MemberRepositoryCustom {

    @Query("select m from Member m where m.isDeleted=false and m.kakaoId=:kakaoId")
    Optional<Member> findByKakaoId(@Param("kakaoId") String kakaoId);

    @Query("select m from Member m where m.isDeleted=false and m.appleId=:appleId")
    Optional<Member> findByAppleId(@Param("appleId") String appleId);

    Optional<Member> findBySeq(Long memberSeq);

}
