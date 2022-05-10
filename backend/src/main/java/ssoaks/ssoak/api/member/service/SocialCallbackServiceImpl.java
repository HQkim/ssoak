package ssoaks.ssoak.api.member.service;


import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssoaks.ssoak.api.member.dto.request.ReqKakaoCallbackDto;
import ssoaks.ssoak.api.member.entity.Member;
import ssoaks.ssoak.api.member.repository.MemberRepository;

import java.util.Base64;

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
    public Integer checkKakaoCallbackAndDeleteMember
            (String adminKey, ReqKakaoCallbackDto reqKakaoCallbackDto) throws Exception{

        Integer statusCode;
        String referredType = reqKakaoCallbackDto.getReferrer_type();
        try {
            if (adminKey == ourKakaoAdminKey && (referredType == "ACCOUNT_DELETE" || referredType == "UNLINK_FROM_ADMIN" || referredType == "UNLINK_FROM_APPS")) {
                statusCode = deleteMemberByKakaoId(reqKakaoCallbackDto.getUser_id());;
            } else {
                throw new Exception("어드민키 다름!!!");
            }
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage());
            throw new Exception(e.getMessage());
        } catch (Exception e) {
            log.error(e.getMessage());
            log.debug("checkKakaoCallbackAndDeleteMember 계정 삭제 로직 실패");
            throw new Exception("계정 삭제 로직 실패");
        }

        return 200;
    }

    @Transactional
    @Override
    public Integer checkAppleCallbackAndDeleteMember(String jwtApple) throws Exception{
        Integer statusCode;

        try {

            // jwtApple decoding
            System.out.println("jwtApple: " + jwtApple);
            String[] jwtSplit = jwtApple.split("\\.");
            System.out.println("jwtSplit: " + jwtSplit[1]);
            String jwtPayload = jwtSplit[1];
            System.out.println("jwtPayload: " + jwtPayload);
            byte[] decodedBytes = Base64.getDecoder().decode(jwtPayload);
            System.out.println("decodedBytes: " + decodedBytes);
            JSONObject jsonObject = new JSONObject(new String(decodedBytes));
            System.out.println("jsonObject: " + jsonObject);

            // 필요한 값 뽑아내기
            String eventType = jsonObject.getJSONObject("events").getString("type");
            System.out.println("eventType: " + eventType);
            String appleId = jsonObject.getJSONObject("events").getString("sub");
            System.out.println("appleId: " + appleId);
            String eventTime = jsonObject.getJSONObject("events").getString("event_time");
            System.out.println("eventTime: " + eventTime);

            // eventType 체크해서 deleteMember 처리하기 ("consent-revoked": 유저가 Apple ID 연동 해제했을 때, "account-delete": 유저가 Apple ID를 삭제했을 때)
            // 카카오 로그인은 바로바로 request가 날라온다는데, Apple은 그렇지 않고 일괄적으로 날라올 수도 있다고 한다.. 테스트 해보자
            if (eventType == "consent-revoked" || eventType == "account-delete") {
                statusCode = deleteMemberByAppleId(appleId);
            } else {
                throw new Exception("Apple EventType 다름!");
            }

        } catch (IllegalArgumentException e) {
            log.error(e.getMessage());
            throw new Exception(e.getMessage());
        } catch (Exception e) {
            log.error("checkAppleCallbackAndDeleteMember 계정 삭제 로직 실패");
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

    public Integer deleteMemberByAppleId(String appleId) throws Exception {
        Member member;

        member = memberRepository.findByAppleId(appleId).orElseThrow(() -> new IllegalArgumentException("애플 아이디에 맞는 멤버 없음"));

        try {
            member.deleteMember();
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new Exception("멤버 익명화 처리 실패");
        }

        return 200;
    }


}
