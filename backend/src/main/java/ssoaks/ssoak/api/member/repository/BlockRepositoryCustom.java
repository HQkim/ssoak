package ssoaks.ssoak.api.member.repository;

import java.util.List;

public interface BlockRepositoryCustom {

    Integer countBlockByMemberSeq(Long memberSeq);

    List<Long> getMyBlackList(Long memberSeq);

    // 내 블랙리스트와 전체 블랙된 멤버 리스트
    List<Long> getMyAndCommonBlackList(Long memberSeq);

}
