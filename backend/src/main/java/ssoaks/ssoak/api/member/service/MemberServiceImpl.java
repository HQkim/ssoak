package ssoaks.ssoak.api.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssoaks.ssoak.api.auction.entity.Item;
import ssoaks.ssoak.api.auction.repository.ItemRepository;
import ssoaks.ssoak.api.auction.dto.response.ItemOverviewDto;
import ssoaks.ssoak.api.member.dto.response.ResMemberProfileDTO;
import ssoaks.ssoak.api.member.dto.response.ResOtherMemberProfileDTO;
import ssoaks.ssoak.api.member.entity.Member;
import ssoaks.ssoak.api.member.exception.NotAuthenticatedMemberException;
import ssoaks.ssoak.api.member.exception.NotFoundMemberException;
import ssoaks.ssoak.api.member.repository.MemberRepository;
import ssoaks.ssoak.common.util.SecurityUtil;

import java.util.List;
import java.util.Optional;

@Slf4j
@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;

    private final ItemRepository itemRepository;


    @Override
    public Member getMemberByAuthentication() {
        long id = -1L;
        Optional<String> username = SecurityUtil.getCurrentUsername();
        if (username.isPresent()) {
            id = Long.parseLong(username.get());
        }
        return memberRepository.findById(id).orElse(null);
    }

    @Override
    public ResMemberProfileDTO getMyProfile() {

        Member member;
        Long memberSeq;

        try {
            member = getMemberByAuthentication();
            memberSeq = member.getSeq();

        } catch (Exception e) {
            throw new NotAuthenticatedMemberException("MemberServiceImple getMyProfile() 회원정보 호출 실패");
        }

        ResMemberProfileDTO memberProfile = new ResMemberProfileDTO(member.getSeq(), member.getEmail(),
                member.getNickname(), member.getProfileImageUrl(), member.getGrade());

        return memberProfile;
    }

    @Override
    public List<ItemOverviewDto> getMySellingItems() {

        Long memberSeq;

        try {
            memberSeq = getMemberByAuthentication().getSeq();
        } catch (Exception e) {
            throw new NotAuthenticatedMemberException("MemberServiceImple getMySellingItems() 회원정보 호출 실패");
        }

        List<ItemOverviewDto> sellingItems = itemRepository.getSellingItemOverviewsByMember(memberSeq);

        return sellingItems;
    }

    @Override
    public List<ItemOverviewDto> getMySoldItems() {
        Long memberSeq;

        try {
            memberSeq = getMemberByAuthentication().getSeq();
        } catch (Exception e) {
            throw new NotAuthenticatedMemberException("MemberServiceImple getMySoldItems() 회원정보 호출 실패");
        }

        List<ItemOverviewDto> soldItems = itemRepository.getSoldItemOverviewsByMember(memberSeq);

        return soldItems;
    }

    @Override
    public List<ItemOverviewDto> getMyUnsoldItems() {

        Long memberSeq;

        try {
            memberSeq = getMemberByAuthentication().getSeq();
        } catch (Exception e) {
            throw new NotAuthenticatedMemberException("MemberServiceImple getMyUnsoldItems() 회원정보 호출 실패");
        }

        List<ItemOverviewDto> unsoldItems = itemRepository.getUnsoldItemOverviewsByMember(memberSeq);

        return unsoldItems;
    }

    @Transactional
    @Override
    public Integer deleteMember() {

        Member member;
        Long memberSeq;

        try {
            member = getMemberByAuthentication();
            memberSeq = member.getSeq();
        } catch (Exception e) {
            throw new NotAuthenticatedMemberException("MemberServiceImple deleteMember() 회원정보 호출 실패");
        }

        try {
            member.deleteMember();
        } catch (Exception e) {
            return 409;
        }

        memberRepository.save(member);

        return 200;
    }

    @Override
    public ResOtherMemberProfileDTO getOtherMemberProfile(Long memberSeq) {

        Member member;
        Member otherMember;

        try {
            member = getMemberByAuthentication();
            member.getSeq();
        } catch (Exception e) {
            throw new NotAuthenticatedMemberException("MemberServiceImple getOtherMemberProfile() 회원정보 호출 실패");
        }

        otherMember = memberRepository.findBySeq(memberSeq).orElseThrow(() -> new NotFoundMemberException("회원을 찾을 수 없음"));

        // 나중에 count만 따로 가져오는 repository 메소드 만들어서 쓰는것이 나아보임.
        List<Item> soldItems = itemRepository.getSoldItemsByMember(memberSeq);

        ResOtherMemberProfileDTO memberProfile = new ResOtherMemberProfileDTO(otherMember.getSeq(), otherMember.getNickname(),
                otherMember.getProfileImageUrl(), otherMember.getGrade(), otherMember.getIsDeleted(), soldItems.size());

        return memberProfile;
    }

    @Override
    public List<ItemOverviewDto> getMyBoughtItems() {
        Long memberSeq;

        try {
            memberSeq = getMemberByAuthentication().getSeq();
        } catch (Exception e) {
            throw new NotAuthenticatedMemberException("MemberServiceImple getMyBoughtItems() 회원정보 호출 실패");
        }

        List<ItemOverviewDto> unsoldItems = itemRepository.getBoughtItemOverviewsByMember(memberSeq);

        return unsoldItems;
    }

    @Override
    public List<ItemOverviewDto> getMyLikedItems() {
        Long memberSeq;

        try {
            memberSeq = getMemberByAuthentication().getSeq();
        } catch (Exception e) {
            throw new NotAuthenticatedMemberException("MemberServiceImple getMyBoughtItems() 회원정보 호출 실패");
        }

        List<ItemOverviewDto> likedItems = itemRepository.getLikedItemOverviewsByMember(memberSeq);

        return likedItems;
    }
}

