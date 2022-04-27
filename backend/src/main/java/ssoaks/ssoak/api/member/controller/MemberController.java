package ssoaks.ssoak.api.member.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssoaks.ssoak.api.member.dto.request.ReqMemberProfileDTO;
import ssoaks.ssoak.api.member.dto.response.ResMemberProfileDTO;
import ssoaks.ssoak.api.member.dto.response.ResSocialLoginDTO;
import ssoaks.ssoak.api.member.entity.Member;
import ssoaks.ssoak.api.member.service.MemberService;
import ssoaks.ssoak.common.dto.BaseDataResponseDTO;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/api/v1/members/profile")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @GetMapping("")
    public ResponseEntity<BaseDataResponseDTO<ResMemberProfileDTO>> getMyProfile (
    ) {
        log.debug("getMyProfile - Get");
        Member member = memberService.getMemberByAuthentication();
        BaseDataResponseDTO<ResMemberProfileDTO> memberProfile;
        // 회원정보 조회 실패
        if (member == null) {
            memberProfile = new BaseDataResponseDTO<>(404, "회원정보 조회 실패", null);
            return ResponseEntity.status(404).body(memberProfile);
        }

        // 회원정보 조회 성공
        memberProfile = new BaseDataResponseDTO<>(200, "회원정보 조회 성공",
                new ResMemberProfileDTO(member.getSeq(), member.getEmail(), member.getNickname(), member.getProfileImageUrl()));
        return ResponseEntity.status(200).body(memberProfile);
    }
}