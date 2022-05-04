package ssoaks.ssoak.api.member.service;

import com.google.gson.*;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.ObjectUtils;
import org.springframework.web.client.RestTemplate;
import ssoaks.ssoak.api.member.entity.Member;
import ssoaks.ssoak.api.member.exception.BadRequestSoicalLoginException;
import ssoaks.ssoak.api.member.repository.MemberRepository;
import ssoaks.ssoak.common.jwt.JwtAuthenticationProvider;

import javax.transaction.Transactional;
import java.io.*;
import java.math.BigInteger;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.RSAPublicKeySpec;
import java.util.Base64;
import java.util.Objects;


@Transactional
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final PasswordEncoder passwordEncoder;

    private final MemberRepository memberRepository;

    private final JwtAuthenticationProvider jwtAuthenticationProvider;

    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    // Controller에서 호출하는 메서드
    @Override
    public Member loginByKakao(String authCode) {
        // 인가코드 -> 엑세스 토큰
        String accessToken = getAccessTokenByKakao(authCode);

        // 엑세스 토큰 -> 카카오 사용자 정보
        Member kakaoUser = getMemberInfoByKakaoToken(accessToken);

        Member member = memberRepository.findByKakaoId(kakaoUser.getKakaoId()).orElse(null);
        if (member == null) {
            member = Member.builder()
                    .kakaoId(kakaoUser.getKakaoId())
                    .appleId(null)
                    .email(kakaoUser.getEmail())
                    .nickname(kakaoUser.getNickname())
                    .profileImageUrl(kakaoUser.getProfileImageUrl())
                    .grade(0.0)
                    .isDeleted(false)
                    .password(passwordEncoder.encode(kakaoUser.getKakaoId()))
                    .build();

            memberRepository.save(member);
        }

        return member;
    }

    // Controller에서 호출하는 메서드
    @Override
    public String loginByApple(String socialToken) {

        String jwt = "";
        Member member;

        try {
            Member appleMember = memberFromApple(socialToken);
            member = memberRepository.findByAppleId(appleMember.getAppleId()).orElse(null);
            if (member == null) {
                member = Member.builder()
                        .kakaoId(null)
                        .appleId(appleMember.getAppleId())
                        .email(appleMember.getEmail())
                        .nickname(appleMember.getNickname())
                        .profileImageUrl(appleMember.getProfileImageUrl())
                        .grade(0.0)
                        .isDeleted(false)
                        .password(passwordEncoder.encode(appleMember.getAppleId()))
                        .build();

                memberRepository.save(member);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new IllegalArgumentException("애플 로그인 실패");
        }

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(member.getSeq(), member.getAppleId());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        jwt = jwtAuthenticationProvider.createToken(authentication);

        System.out.println("========jwt" + jwt);

        return jwt;
    }


    /**
     * 여기는 애플 로그인
     * 1. apple로 부터 공개키 3개 가져옴
     * 2. 내가 클라에서 가져온 token String과 비교해서 써야할 공개키 확인 (kid,alg 값 같은 것)
     * 3. 그 공개키 재료들로 공개키 만들고, 이 공개키로 JWT토큰 부분의 바디 부분의 decode하면 유저 정보
     */
    public Member memberFromApple(String idToken) throws Exception {
        StringBuffer result = new StringBuffer();
        try {
            URL url = new URL("https://appleid.apple.com/auth/keys");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            String line = "";

            while ((line = br.readLine()) != null) {
                result.append(line);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new Exception("error1");
        }
//        catch (IOException e) {
//            throw new BusinessException(ErrorCode.FAILED_TO_VALIDATE_APPLE_LOGIN);
//        }

        JsonParser parser = new JsonParser();
        JsonObject keys = (JsonObject) parser.parse(result.toString());
        JsonArray keyArray = (JsonArray) keys.get("keys");


        //클라이언트로부터 가져온 identity token String decode
        String[] decodeArray = idToken.split("\\.");
        String header = new String(Base64.getDecoder().decode(decodeArray[0]));

        //apple에서 제공해주는 kid값과 일치하는지 알기 위해
        JsonElement kid = ((JsonObject) parser.parse(header)).get("kid");
        JsonElement alg = ((JsonObject) parser.parse(header)).get("alg");

        //써야하는 Element (kid, alg 일치하는 element)
        JsonObject avaliableObject = null;
        for (int i = 0; i < keyArray.size(); i++) {
            JsonObject appleObject = (JsonObject) keyArray.get(i);
            JsonElement appleKid = appleObject.get("kid");
            JsonElement appleAlg = appleObject.get("alg");

            if (Objects.equals(appleKid, kid) && Objects.equals(appleAlg, alg)) {
                avaliableObject = appleObject;
                break;
            }
        }

        //일치하는 공개키 없음
        if (ObjectUtils.isEmpty(avaliableObject))
            throw new Exception("error2");
//            throw new BusinessException(ErrorCode.FAILED_TO_FIND_AVALIABLE_RSA);

        PublicKey publicKey = this.getPublicKey(avaliableObject);

        //--> 여기까지 검증

        Claims userInfo = Jwts.parser().setSigningKey(publicKey).parseClaimsJws(idToken).getBody();
        JsonObject userInfoObject = (JsonObject) parser.parse(new Gson().toJson(userInfo));
        JsonElement appleAlg = userInfoObject.get("sub");
        String userId = appleAlg.getAsString();
        String email = userInfoObject.get("email").getAsString();
        String profileImageUrl = "https://ssoak-bucket.s3.ap-northeast-2.amazonaws.com/a460929c-021c-4e88-80cc-52ad574ce9ef.png";
        String[] nickname = email.split("@");
        System.out.println("-===============emil: " + email);
        System.out.println("-===============nickname: " + nickname[0]);


        Member appleMember =  Member.builder()
                .kakaoId(null)
                .appleId(userId)
                .email(email)
                .nickname(nickname[0])
                .profileImageUrl(profileImageUrl)
                .grade(0.0)
                .isDeleted(false)
                .password(null)
                .build();
        return appleMember;
    }

    public PublicKey getPublicKey(JsonObject object) throws Exception{
        String nStr = object.get("n").toString();
        String eStr = object.get("e").toString();

        byte[] nBytes = Base64.getUrlDecoder().decode(nStr.substring(1, nStr.length() - 1));
        byte[] eBytes = Base64.getUrlDecoder().decode(eStr.substring(1, eStr.length() - 1));

        BigInteger n = new BigInteger(1, nBytes);
        BigInteger e = new BigInteger(1, eBytes);

        try {
            RSAPublicKeySpec publicKeySpec = new RSAPublicKeySpec(n, e);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            PublicKey publicKey = keyFactory.generatePublic(publicKeySpec);
            return publicKey;
        } catch (Exception exception) {
            throw new Exception("error3");
//            throw new BusinessException(ErrorCode.FAILED_TO_FIND_AVALIABLE_RSA);
        }
    }


    /**
     * 여기는 카카오 로그인
     * @param accessToken
     * @return
     */
    private Member getMemberInfoByKakaoToken(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<MultiValueMap<String, String>> kakaoProfileReq = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoProfileReq,
                String.class
        );

        JSONObject body = new JSONObject(response.getBody());

        Long id = body.getLong("id");
        String socialId = String.valueOf(id);
        String nickname = body.getJSONObject("properties").getString("nickname");
        String profileImageUrl = body.getJSONObject("kakao_account").getJSONObject("profile").getString("profile_image_url");

        String email = "";
        if (body.getJSONObject("kakao_account").getBoolean("has_email")) {
            if (!body.getJSONObject("kakao_account").getBoolean("email_needs_agreement")) {
                email = body.getJSONObject("kakao_account").getString("email");
            }
        }

        return Member.builder()
                .kakaoId(socialId)
                .appleId(null)
                .email(email)
                .nickname(nickname)
                .profileImageUrl(profileImageUrl)
                .grade(0.0)
                .isDeleted(false)
                .password(null)
                .build();

    }

    private String getAccessTokenByKakao(String authCode) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", "06d2438acf1f84102b574a2ce97bcd10");
        params.add("code", authCode);
        params.add("redirect_uri", "https://auth.expo.io/@ssafy207/frontend");

        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<MultiValueMap<String, String>> kakaoTokenReq = new HttpEntity<>(params, headers);

        System.out.println("=========================1");

        ResponseEntity<String> response = null;

        try {
            response = restTemplate.exchange(
                    "https://kauth.kakao.com/oauth/token",
                    HttpMethod.POST,
                    kakaoTokenReq,
                    String.class
            );
        } catch (Exception e) {
            throw new BadRequestSoicalLoginException("잘못된 카카오 로그인 코드");
        }

        System.out.println("========================2");
        String tokenJson = response.getBody();
        JSONObject jsObject = new JSONObject(tokenJson);
        String accessToken = jsObject.getString("access_token");

        return accessToken;
    }


}