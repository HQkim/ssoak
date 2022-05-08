package ssoaks.ssoak.api.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssoaks.ssoak.api.auction.dto.response.ItemImageSimpleInfoDto;
import ssoaks.ssoak.api.auction.dto.response.ItemOverviewLikedDto;
import ssoaks.ssoak.api.auction.entity.Item;
import ssoaks.ssoak.api.auction.repository.ImageRepository;
import ssoaks.ssoak.api.auction.repository.ItemRepository;
import ssoaks.ssoak.api.auction.dto.response.ItemOverviewDto;
import ssoaks.ssoak.api.auction.service.AwsS3Service;
import ssoaks.ssoak.api.member.dto.request.ReqMemberProfileChangeDto;
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

    private final ImageRepository imageRepository;

    private final AwsS3Service awsS3Service;

    private final AuthService authService;


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
            throw new NotAuthenticatedMemberException("MemberServiceImpl getMyProfile() 회원 인증 실패");
        }

        ResMemberProfileDTO memberProfile = new ResMemberProfileDTO(member.getSeq(), member.getEmail(),
                member.getNickname(), member.getProfileImageUrl(), member.getGrade());

        return memberProfile;
    }

    @Transactional
    @Override
    public Integer changeMember(ReqMemberProfileChangeDto reqMemberProfileChangeDto) {
        Member member;
        Long memberSeq;

        try {
            member = getMemberByAuthentication();
            memberSeq = member.getSeq();
        } catch (Exception e) {
            throw new NotAuthenticatedMemberException("MemberServiceImpl changeMember() 회원 인증 실패");
        }

        // 이미지가 들어왔을 때 변경시키기

        String newImageUrl;
        String newNickname;

        try {
            if (reqMemberProfileChangeDto.getProfileImage() != null) {
                newImageUrl = awsS3Service.uploadImage(reqMemberProfileChangeDto.getProfileImage());
            } else {
                newImageUrl = member.getProfileImageUrl();
            }

            if (reqMemberProfileChangeDto.getNickname() != null) {
                newNickname = reqMemberProfileChangeDto.getNickname();
            } else {
                newNickname = member.getNickname();
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new IllegalArgumentException("MemberServiceImpl changeMember() 프로필 수정 실패");
        }

        // 둘다 들어오지 않은 경우
        if (reqMemberProfileChangeDto.getNickname() == null && reqMemberProfileChangeDto.getProfileImage() == null) {
            System.out.println("MemberServiceImpl changeMember() 변경된 내용이 없습니다.");
            return 202;
        }


        member.changeMember(newNickname, newImageUrl);

        return 200;
    }

    @Transactional
    @Override
    public Integer deleteMember() throws Exception {

        Member member;
        Long memberSeq;

        try {
            member = getMemberByAuthentication();
            memberSeq = member.getSeq();
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new NotAuthenticatedMemberException("MemberServiceImpl deleteMember() 회원 인증 실패");
        }

        try {
            String kakaoId = member.getKakaoId();
            String resKakaoId = authService.disconnectKakao(kakaoId);

            System.out.println("===기존 카카오 아이디: " + kakaoId);
            System.out.println("===연결끊기후 카카오 아이디: " + resKakaoId);
        } catch (Exception e) {
            log.error(e.getMessage());
            return 503;
        }

        try {
            member.deleteMember();
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new Exception("멤버 익명화 처리 실패");
        }

        return 200;
    }

    @Override
    public List<ItemOverviewDto> getMySellingItems() {

        Long memberSeq;
        List<ItemOverviewDto> sellingItems;

        try {
            memberSeq = getMemberByAuthentication().getSeq();
        } catch (Exception e) {
            throw new NotAuthenticatedMemberException("MemberServiceImpl getMySellingItems() 회원 인증 실패");
        }

        try {
            sellingItems = itemRepository.getSellingItemOverviewsByMember(memberSeq);
        } catch (Exception e) {
            throw new IllegalArgumentException("MemberServiceImpl getMySellingItems() 판매중 물품 조회 실패");
        }

        return sellingItems;
    }

    @Override
    public List<ItemOverviewDto> getMySoldItems() {
        Long memberSeq;
        List<ItemOverviewDto> soldItems;

        try {
            memberSeq = getMemberByAuthentication().getSeq();
        } catch (Exception e) {
            throw new NotAuthenticatedMemberException("MemberServiceImpl getMySoldItems() 회원정보 인증 실패");
        }

        try {
            soldItems = itemRepository.getSoldItemOverviewsByMember(memberSeq);
        } catch (Exception e) {
            throw new IllegalArgumentException("MemberServiceImpl getMySoldItems() 판매완료 물품 조회 실패");
        }

        return soldItems;
    }

    @Override
    public List<ItemOverviewDto> getMyUnsoldItems() {

        Long memberSeq;
        List<ItemOverviewDto> unsoldItems;

        try {
            memberSeq = getMemberByAuthentication().getSeq();
        } catch (Exception e) {
            throw new NotAuthenticatedMemberException("MemberServiceImpl getMyUnsoldItems() 회원 인증 실패");
        }

        try {
            unsoldItems = itemRepository.getUnsoldItemOverviewsByMember(memberSeq);
        } catch (Exception e) {
            throw new IllegalArgumentException("MemberServiceImpl getMyUnsoldItems() 판매완료 물품 조회 실패");
        }

        return unsoldItems;
    }

    @Override
    public List<ItemOverviewDto> getMyBoughtItems() {
        Long memberSeq;
        List<ItemOverviewDto> boughtItems;

        try {
            memberSeq = getMemberByAuthentication().getSeq();
        } catch (Exception e) {
            throw new NotAuthenticatedMemberException("MemberServiceImpl getMyBoughtItems() 회원 인증 실패");
        }

        try {
            boughtItems = itemRepository.getBoughtItemOverviewsByMember(memberSeq);
        } catch (Exception e) {
            throw new IllegalArgumentException("MemberServiceImpl getMyBoughtItems() 구매한 물품 조회 실패");
        }

        return boughtItems;
    }

    @Override
    public List<ItemOverviewLikedDto> getMyLikedItems() {
        Long memberSeq;
        List<ItemOverviewLikedDto> likedItems;

        try {
            memberSeq = getMemberByAuthentication().getSeq();
        } catch (Exception e) {
            throw new NotAuthenticatedMemberException("MemberServiceImpl getMyLikedItems() 회원 인증 실패");
        }

        try {
            likedItems = itemRepository.getLikedItemOverviewsByMember(memberSeq);
        } catch (Exception e) {
            throw new IllegalArgumentException("MemberServiceImpl getMyLikedItems() 찜한 물품 조회 실패");
        }

        return likedItems;
    }

    @Override
    public ResOtherMemberProfileDTO getOtherMemberProfile(Long memberSeq) {

        Member member;
        Member otherMember;

        try {
            member = getMemberByAuthentication();
            member.getSeq();
        } catch (Exception e) {
            throw new NotAuthenticatedMemberException("MemberServiceImpl getOtherMemberProfile() 회원 인증 실패");
        }

        otherMember = memberRepository.findBySeq(memberSeq).orElseThrow(() -> new NotFoundMemberException("회원을 찾을 수 없음"));

        // 나중에 count만 따로 가져오는 repository 메소드 만들어서 쓰는것이 나아보임.
        List<Item> soldItems = itemRepository.getSoldItemsByMember(memberSeq);

        ResOtherMemberProfileDTO memberProfile = new ResOtherMemberProfileDTO(otherMember.getSeq(), otherMember.getNickname(),
                otherMember.getProfileImageUrl(), otherMember.getGrade(), otherMember.getIsDeleted(), soldItems.size());

        return memberProfile;
    }





}

