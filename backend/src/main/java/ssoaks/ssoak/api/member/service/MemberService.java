package ssoaks.ssoak.api.member.service;

import ssoaks.ssoak.api.auction.dto.response.ItemOverviewDto;
import ssoaks.ssoak.api.member.entity.Member;

import java.util.List;

public interface MemberService {

    Member getMemberByAuthentication();
    List<ItemOverviewDto> getSellingItemsByMemberSeq(Long memberSeq);

}
