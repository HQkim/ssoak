package ssoaks.ssoak.api.member.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssoaks.ssoak.api.auction.dto.response.ItemOverviewDto;
import ssoaks.ssoak.api.member.dto.response.ResMemberProfileDTO;
import ssoaks.ssoak.api.member.dto.response.ResMemberProfileItemsDTO;
import ssoaks.ssoak.api.member.entity.Member;
import ssoaks.ssoak.api.member.service.MemberService;
import ssoaks.ssoak.common.dto.BaseDataResponseDTO;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/members/profile")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @GetMapping("")
    public ResponseEntity<BaseDataResponseDTO<ResMemberProfileDTO>> getMyProfile () {
        log.debug("API getMyProfile 호출됨");

        Member member = memberService.getMemberByAuthentication();
        BaseDataResponseDTO<ResMemberProfileDTO> memberProfile;

        // 회원정보 조회 실패
        if (member == null) {
            memberProfile = new BaseDataResponseDTO<>(400, "회원정보 조회 실패", null);
            return ResponseEntity.status(400).body(memberProfile);
        }

        // 회원정보 조회 성공
        memberProfile = new BaseDataResponseDTO<>(200, "회원정보 조회 성공",
                new ResMemberProfileDTO(member.getSeq(), member.getEmail(), member.getNickname(), member.getProfileImageUrl(), member.getGrade()));
        return ResponseEntity.status(200).body(memberProfile);
    }

    @GetMapping("/selling")
    public ResponseEntity<BaseDataResponseDTO<ResMemberProfileItemsDTO>> getSellingItems () {
        log.debug("/members/profile/selling getSellingItems 호출됨");

        Member member = memberService.getMemberByAuthentication();
        Long member_seq = member.getSeq();
        BaseDataResponseDTO<ResMemberProfileItemsDTO> resMemberProfileSelling;

        // 회원정보 조회 실패
        if (member == null) {
            resMemberProfileSelling = new BaseDataResponseDTO<>(400, "회원정보 조회 실패", null);
            return ResponseEntity.status(400).body(resMemberProfileSelling);
        }

        // 회원정보 조회 성공
        List<ItemOverviewDto> sellingItems = memberService.getSellingItemsByMemberSeq(member_seq);

        resMemberProfileSelling = new BaseDataResponseDTO<ResMemberProfileItemsDTO>(200, "판매중 아이템 조회 성공",
                ResMemberProfileItemsDTO.builder().itemOverviewDtos(sellingItems).build());

        return ResponseEntity.status(200).body(resMemberProfileSelling);
    }


}