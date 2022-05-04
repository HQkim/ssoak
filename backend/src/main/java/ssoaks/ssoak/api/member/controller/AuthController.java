package ssoaks.ssoak.api.member.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ssoaks.ssoak.api.member.dto.request.ReqSocialLoginDTO;
import ssoaks.ssoak.api.member.dto.response.ResSocialLoginDTO;
import ssoaks.ssoak.api.member.entity.Member;
import ssoaks.ssoak.api.member.exception.BadRequestSoicalLoginException;
import ssoaks.ssoak.api.member.service.AuthService;
import ssoaks.ssoak.common.dto.BaseDataResponseDTO;
import ssoaks.ssoak.common.jwt.JwtAuthenticationProvider;

@Slf4j
@RestController
@RequestMapping("/api/v1/members/login")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    private final JwtAuthenticationProvider jwtAuthenticationProvider;

    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @PostMapping("/kakao")
    public ResponseEntity<BaseDataResponseDTO<ResSocialLoginDTO>> loginByKakao(@RequestBody ReqSocialLoginDTO reqSocialLoginDTO) {
        log.debug("AuthController loginByKakao 호출됨");
        String code = reqSocialLoginDTO.getCode();

        Member member;
        try {
            member = authService.loginByKakao(code);
        } catch (BadRequestSoicalLoginException e) {
            log.error(e.getMessage());
            return ResponseEntity.status(400).body(new BaseDataResponseDTO<>(400, "잘못된 카카오 로그인 코드", null));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(500).body(new BaseDataResponseDTO<>(500, "내부 서버 에러", null));
        }

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(member.getSeq(), member.getKakaoId());

        // authenticate 메서드가 실행이 될 때 CustomUserDetailsService 에서 만들었던 loadUserByUsername 메서드가 실행됨
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtAuthenticationProvider.createToken(authentication);

        BaseDataResponseDTO<ResSocialLoginDTO> token = new BaseDataResponseDTO<>(200, "카카오 로그인 성공", new ResSocialLoginDTO(jwt));
        return ResponseEntity.status(200).body(token);
    }

    @PostMapping("/apple")
    public ResponseEntity<BaseDataResponseDTO<ResSocialLoginDTO>> loginByApple(@RequestHeader("Social-Token") String socialToken) {

        String jwt;
        try {
            jwt = authService.loginByApple(socialToken);
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage());
            return ResponseEntity.status(409).body(new BaseDataResponseDTO<>(409, "애플 로그인 실패", null));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(500).body(new BaseDataResponseDTO<>(500, "내부 서버 에러", null));
        }

        BaseDataResponseDTO<ResSocialLoginDTO> token = new BaseDataResponseDTO<>(200, "애플 로그인 성공", new ResSocialLoginDTO(jwt));
        return ResponseEntity.status(200).body(token);
    }

}