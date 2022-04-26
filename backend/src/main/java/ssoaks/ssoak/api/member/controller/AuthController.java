package ssoaks.ssoak.api.member.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ssoaks.ssoak.api.member.dto.request.SocialLoginRequestDTO;
import ssoaks.ssoak.api.member.dto.response.SocialLoginResponseDTO;
import ssoaks.ssoak.api.member.entity.Member;
import ssoaks.ssoak.api.member.service.AuthService;
import ssoaks.ssoak.common.dto.BaseDataResponseDTO;
import ssoaks.ssoak.common.jwt.JwtAuthenticationProvider;

@Slf4j
@RestController
@RequestMapping("/api/v1/members/login")
public class AuthController {

    @Autowired
    AuthService authService;

    @Autowired
    JwtAuthenticationProvider jwtAuthenticationProvider;

    @Autowired
    AuthenticationManagerBuilder authenticationManagerBuilder;

    @PostMapping("/kakao")
    public ResponseEntity<BaseDataResponseDTO<SocialLoginResponseDTO>> loginByKakao(@RequestBody SocialLoginRequestDTO socialLoginRequestDTO) {
        String code = socialLoginRequestDTO.getCode();

        Member member = authService.loginByKakao(code);

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(member.getSeq(), member.getKakaoId());

        // authenticate 메서드가 실행이 될 때 CustomUserDetailsService 에서 만들었던 loadUserByUsername 메서드가 실행됨
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtAuthenticationProvider.createToken(authentication);

        BaseDataResponseDTO<SocialLoginResponseDTO> token = new BaseDataResponseDTO<SocialLoginResponseDTO>(200, "카카오 로그인 성공", new SocialLoginResponseDTO(jwt));
        return ResponseEntity.status(200).body(token);
    }

    @PostMapping("/google")
    public ResponseEntity<BaseDataResponseDTO<SocialLoginResponseDTO>> loginByGoogle(@RequestParam(value = "code") String code) {
        Member member = authService.loginByGoogle(code);
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(member.getSeq(), member.getGoogleId());
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtAuthenticationProvider.createToken(authentication);

        BaseDataResponseDTO<SocialLoginResponseDTO> token = new BaseDataResponseDTO<SocialLoginResponseDTO>(200, "구글 로그인 성공", new SocialLoginResponseDTO(jwt));
        return ResponseEntity.status(200).body(token);
    }
}