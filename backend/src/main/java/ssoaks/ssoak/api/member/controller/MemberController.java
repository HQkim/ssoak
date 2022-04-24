package ssoaks.ssoak.api.member.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ssoaks.ssoak.api.member.service.MemberService;
import ssoaks.ssoak.common.dto.BaseDataResponseDTO;
import ssoaks.ssoak.common.dto.BaseResponseDTO;

//@Slf4j
//@RequiredArgsConstructor
//@RequestMapping("/api/v1/members")
//@RestController
//public class MemberController {
//
//    private final MemberService memberService;
//
//    @PostMapping("login/kakao")
//    public ResponseEntity<BaseDataResponseDTO<>> loginByKakao()
//
//    @PostMapping("login/google")
//}
