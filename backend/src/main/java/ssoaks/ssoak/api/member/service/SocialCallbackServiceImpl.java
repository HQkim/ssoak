package ssoaks.ssoak.api.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssoaks.ssoak.api.member.dto.request.ReqKakaoCallbackDto;
import ssoaks.ssoak.api.member.entity.Member;
import ssoaks.ssoak.api.member.repository.MemberRepository;

@Slf4j
@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class SocialCallbackServiceImpl implements SocialCallbackService{

    private final MemberService memberService;

    private final MemberRepository memberRepository;

    @Value("${kakao.admin-key}")
    private String ourKakaoAdminKey;

    @Transactional
    @Override
    public Integer checkDisconnectCallbackAndDeleteMember
            (String adminKey, ReqKakaoCallbackDto reqKakaoCallbackDto) throws Exception{

        Integer statusCode;
        try {
            if (adminKey == ourKakaoAdminKey) {
                statusCode = deleteMemberByKakaoId(reqKakaoCallbackDto.getUserId());;
            } else {
                throw new Exception("어드민키 다름!!!");
            }
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage());
            throw new Exception(e.getMessage());
        } catch (Exception e) {
            log.error(e.getMessage());
            log.debug("checkDisconnectCallbackAndDeleteMember 계정 삭제 로직 실패");
            throw new Exception("계정 삭제 로직 실패");
        }

        return 200;
    }

    public Integer deleteMemberByKakaoId(String kakaoId) throws Exception {
        Member member;

        member = memberRepository.findByKakaoId(kakaoId).orElseThrow(() -> new IllegalArgumentException("카카오 아이디에 맞는 멤버 없음"));

        try {
            member.deleteMember();
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new Exception("멤버 익명화 처리 실패");
        }

        return 200;
    }

}
