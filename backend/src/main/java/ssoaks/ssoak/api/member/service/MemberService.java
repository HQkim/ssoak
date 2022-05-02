package ssoaks.ssoak.api.member.service;

import ssoaks.ssoak.api.auction.dto.response.ItemOverviewDto;
import ssoaks.ssoak.api.member.dto.response.ResMemberProfileDTO;
import ssoaks.ssoak.api.member.dto.response.ResOtherMemberProfileDTO;
import ssoaks.ssoak.api.member.entity.Member;

import java.util.List;

public interface MemberService {

    Member getMemberByAuthentication();
    ResMemberProfileDTO getMyProfile();
    List<ItemOverviewDto> getMySellingItems();
    List<ItemOverviewDto> getMySoldItems();
    List<ItemOverviewDto> getMyUnsoldItems();
    Integer deleteMember();
    ResOtherMemberProfileDTO getOtherMemberProfile(Long memberSeq);
}
