package ssoaks.ssoak.api.member.repository;

import ssoaks.ssoak.api.member.dto.response.LiveAuctionAlarmDto;

import java.util.List;

public interface MemberRepositoryCustom {
    List<LiveAuctionAlarmDto> getLikedLiveAuctionMember();
}
