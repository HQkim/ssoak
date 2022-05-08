package ssoaks.ssoak.api.member.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssoaks.ssoak.api.member.dto.request.ReqAppleCallbackDto;
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
    public ResponseEntity kakaoCallback (@RequestHeader("Authorization") String appAdminKey, @RequestBody ReqKakaoCallbackDto reqKakaoCallbackDto) {
        log.debug("SocialCallbackController kakaoCallback 호출됨");
        System.out.println("reqKakaoCallbackDto :" + reqKakaoCallbackDto);

        String adminKey = appAdminKey.substring(8);

        try {
            Integer statusCode = socialCallbackService.checkKakaoCallbackAndDeleteMember(adminKey, reqKakaoCallbackDto);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(400).body(null);
        }

        return ResponseEntity.status(200).body(null);
    }

    @PostMapping("/apple")
    public ResponseEntity appleCallback (@RequestBody ReqAppleCallbackDto reqAppleCallbackDto) {
        log.debug("SocialCallbackController appleCallback 호출됨");
        System.out.println("reqAppleCallbackDto: " + reqAppleCallbackDto);

        String jwtApple = reqAppleCallbackDto.getPayload();
        System.out.println("jwtApple: " + jwtApple);

        try {
            Integer statusCode = socialCallbackService.checkAppleCallbackAndDeleteMember(jwtApple);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(400).body(null);
        }

        return ResponseEntity.status(200).body(null);
    }
}
