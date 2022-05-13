package ssoaks.ssoak.api.member.repository;

import java.util.List;

public interface BlockRepositoryCustom {

    Integer countBlockByMemberSeq(Long memberSeq);

    List<Long> getMyBlackList(Long memberSeq);

}
