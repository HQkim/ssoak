package ssoaks.ssoak.api.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssoaks.ssoak.api.auction.repository.ItemRepository;
import ssoaks.ssoak.api.auction.dto.response.ItemOverviewDto;
import ssoaks.ssoak.api.member.dto.response.ResMemberProfileDTO;
import ssoaks.ssoak.api.member.entity.Member;
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

        try {
            member = getMemberByAuthentication();
        } catch (Exception e) {
            throw new NotFoundMemberException("MemberServiceImple getMyProfile() 회원정보 호출 실패");
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
            throw new NotFoundMemberException("MemberServiceImple getMySellingItems() 회원정보 호출 실패");
        }

        List<ItemOverviewDto> sellingItems = itemRepository.getSellingItemsByMember(memberSeq);

        return sellingItems;
    }

    @Override
    public List<ItemOverviewDto> getMySoldItems() {
        Long memberSeq;

        try {
            memberSeq = getMemberByAuthentication().getSeq();
        } catch (Exception e) {
            throw new NotFoundMemberException("MemberServiceImple getMySoldItems() 회원정보 호출 실패");
        }

        List<ItemOverviewDto> soldItems = itemRepository.getSoldItemsByMember(memberSeq);

        return soldItems;
    }

    @Override
    public List<ItemOverviewDto> getMyUnsoldItems() {

        Long memberSeq;

        try {
            memberSeq = getMemberByAuthentication().getSeq();
        } catch (Exception e) {
            throw new NotFoundMemberException("MemberServiceImple getMyUnsoldItems() 회원정보 호출 실패");
        }

        List<ItemOverviewDto> unsoldItems = itemRepository.getUnsoldItemsByMember(memberSeq);

        return unsoldItems;
    }

    @Transactional
    @Override
    public Integer deleteMember() {

        Member member;

        try {
            member = getMemberByAuthentication();
        } catch (Exception e) {
            throw new NotFoundMemberException("MemberServiceImple deleteMember() 회원정보 호출 실패");
        }

        try {
            member.deleteMember();
        } catch (Exception e) {
            return 409;
        }

        memberRepository.save(member);

        return 200;
    }
}

