package ssoaks.ssoak.api.member.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssoaks.ssoak.api.member.dto.request.ReqKakaoCallbackDto;
import ssoaks.ssoak.api.member.service.MemberService;
import ssoaks.ssoak.api.member.service.SocialCallbackService;
import ssoaks.ssoak.common.dto.BaseResponseDTO;

@Slf4j
@RestController
@RequestMapping("/api/v1/members/callback")
@RequiredArgsConstructor
public class SocialCallbackController {

    private final MemberService memberService;

    private final SocialCallbackService socialCallbackService;

    @PostMapping("/kakao")
    public ResponseEntity kakaoDisconnectCallback (@RequestHeader("Authorization") String appAdminKey, @RequestBody ReqKakaoCallbackDto reqKakaoCallbackDto) {
        String adminKey = appAdminKey.substring(8);
        Integer statusCode;

        System.out.println(reqKakaoCallbackDto);

        try {
            statusCode = socialCallbackService.checkDisconnectCallbackAndDeleteMember(adminKey, reqKakaoCallbackDto);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(null);
        }

        return ResponseEntity.status(200).body(null);
    }
}
