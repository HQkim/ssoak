package ssoaks.ssoak.api.member.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssoaks.ssoak.api.auction.dto.response.ItemOverviewDto;
import ssoaks.ssoak.api.auction.dto.response.ItemOverviewLikedDto;
import ssoaks.ssoak.api.member.dto.request.ReqMemberProfileChangeDto;
import ssoaks.ssoak.api.member.dto.request.ReqMemberProfileWrapperDto;
import ssoaks.ssoak.api.member.dto.request.ReqMemberReportDto;
import ssoaks.ssoak.api.member.dto.response.ResMemberProfileDTO;
import ssoaks.ssoak.api.member.dto.response.ResMemberProfileItemsDTO;
import ssoaks.ssoak.api.member.dto.response.ResMemberProfileLikedItemsDTO;
import ssoaks.ssoak.api.member.dto.response.ResOtherMemberProfileDTO;
import ssoaks.ssoak.api.member.exception.NotAuthenticatedMemberException;
import ssoaks.ssoak.api.member.exception.NotFoundMemberException;
import ssoaks.ssoak.api.member.service.MemberService;
import ssoaks.ssoak.common.dto.BaseDataResponseDTO;
import ssoaks.ssoak.common.dto.BaseResponseDTO;

import java.util.List;


@Slf4j
@RestController
@RequestMapping("/api/v1/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/profile")
    public ResponseEntity<BaseDataResponseDTO<ResMemberProfileDTO>> getMyProfile () {
        log.debug("MemberController getMyProfile 호출됨");

        BaseDataResponseDTO<ResMemberProfileDTO> resMemberProfile;
        ResMemberProfileDTO myProfile;

        try {
            myProfile = memberService.getMyProfile();
        } catch (NotAuthenticatedMemberException e) {
            log.error(e.getMessage());
            resMemberProfile = new BaseDataResponseDTO<>(401, "회원 권한 없음", null);
            return ResponseEntity.status(401).body(resMemberProfile);
        } catch (Exception e) {
            log.error(e.getMessage());
            resMemberProfile = new BaseDataResponseDTO<>(500, "내부 서버 에러", null);
            return ResponseEntity.status(500).body(resMemberProfile);
        }

        resMemberProfile = new BaseDataResponseDTO<>(200, "회원정보 조회 성공", myProfile) ;
        return ResponseEntity.status(200).body(resMemberProfile);
    }

    @GetMapping("/profile/selling")
    public ResponseEntity<BaseDataResponseDTO<ResMemberProfileItemsDTO>> getMySellingItems () {
        log.debug("MemberController getMySellingItems 호출됨");

        BaseDataResponseDTO<ResMemberProfileItemsDTO> resMemberProfileSelling;
        List<ItemOverviewDto> sellingItems;

        try {
            sellingItems = memberService.getMySellingItems();
        } catch (NotAuthenticatedMemberException e) {
            log.error(e.getMessage());
            resMemberProfileSelling = new BaseDataResponseDTO<>(401, "회원 권한 없음", null);
            return ResponseEntity.status(401).body(resMemberProfileSelling);
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage());
            resMemberProfileSelling = new BaseDataResponseDTO<>(409, "판매중 물품 조회 실패", null);
            return ResponseEntity.status(409).body(resMemberProfileSelling);
        } catch (Exception e) {
            log.error(e.getMessage());
            resMemberProfileSelling = new BaseDataResponseDTO<>(500, "내부 서버 에러", null);
            return ResponseEntity.status(500).body(resMemberProfileSelling);
        }

        resMemberProfileSelling = new BaseDataResponseDTO<ResMemberProfileItemsDTO>(200, "판매중 물품 조회 성공",
                ResMemberProfileItemsDTO.builder().items(sellingItems).build());

        return ResponseEntity.status(200).body(resMemberProfileSelling);
    }

    @GetMapping("/profile/sold")
    public ResponseEntity<BaseDataResponseDTO<ResMemberProfileItemsDTO>> getMySoldItems () {
        log.debug("MemberController getMySoldItems 호출됨");

        BaseDataResponseDTO<ResMemberProfileItemsDTO> resMemberProfileSold;
        List<ItemOverviewDto> soldItems;

        try {
            soldItems = memberService.getMySoldItems();
        } catch (NotAuthenticatedMemberException e) {
            log.error(e.getMessage());
            resMemberProfileSold = new BaseDataResponseDTO<>(401, "회원 권한 없음", null);
            return ResponseEntity.status(401).body(resMemberProfileSold);
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage());
            resMemberProfileSold = new BaseDataResponseDTO<>(409, "판매완료 물품 조회 실패", null);
            return ResponseEntity.status(409).body(resMemberProfileSold);
        } catch (Exception e) {
            log.error(e.getMessage());
            resMemberProfileSold = new BaseDataResponseDTO<>(500, "내부 서버 에러", null);
            return ResponseEntity.status(500).body(resMemberProfileSold);
        }

        resMemberProfileSold = new BaseDataResponseDTO<ResMemberProfileItemsDTO>(200, "판매완료 물품 조회 성공",
                ResMemberProfileItemsDTO.builder().items(soldItems).build());

        return ResponseEntity.status(200).body(resMemberProfileSold);
    }

    @GetMapping("/profile/unsold")
    public ResponseEntity<BaseDataResponseDTO<ResMemberProfileItemsDTO>> getMyUnsoldItems () {
        log.debug("MemberController getMyUnsoldItems 호출됨");

        BaseDataResponseDTO<ResMemberProfileItemsDTO> resMemberProfileUnsold;
        List<ItemOverviewDto> unsoldItems;

        try {
            unsoldItems = memberService.getMyUnsoldItems();
        } catch (NotAuthenticatedMemberException e) {
            log.error(e.getMessage());
            resMemberProfileUnsold = new BaseDataResponseDTO<>(401, "회원 권한 없음", null);
            return ResponseEntity.status(401).body(resMemberProfileUnsold);
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage());
            resMemberProfileUnsold = new BaseDataResponseDTO<>(409, "판매가 안된 물품 조회 실패", null);
            return ResponseEntity.status(409).body(resMemberProfileUnsold);
        } catch (Exception e) {
            log.error(e.getMessage());
            resMemberProfileUnsold = new BaseDataResponseDTO<>(500, "내부 서버 에러", null);
            return ResponseEntity.status(500).body(resMemberProfileUnsold);
        }

        resMemberProfileUnsold = new BaseDataResponseDTO<ResMemberProfileItemsDTO>(200, "판매가 안된 물품 조회 성공",
                ResMemberProfileItemsDTO.builder().items(unsoldItems).build());

        return ResponseEntity.status(200).body(resMemberProfileUnsold);
    }

    // 프로필 수정
    @PatchMapping("/profile")
    public ResponseEntity<BaseResponseDTO> changeProfileV1 (ReqMemberProfileChangeDto reqProfileChangeDto) {   // @Valid 나중에 테스트 해보기
        log.debug("MemberController changeProfileV1 호출됨");
        System.out.println("reqProfileChangeDto: " + reqProfileChangeDto);
        System.out.println("reqProfileChangeDto.getNickname(): " + reqProfileChangeDto.getNickname());
        System.out.println("reqProfileChangeDto.getProfileImage(): " + reqProfileChangeDto.getProfileImage());


        try {
            Integer statusCode = memberService.changeMember(reqProfileChangeDto);
            if (statusCode == 202) {
                return ResponseEntity.status(202).body(new BaseResponseDTO(202, "변경된 내용이 없습니다."));
            }
        } catch (NotAuthenticatedMemberException e) {
            log.error(e.getMessage());
            return ResponseEntity.status(401).body(new BaseResponseDTO(401, "회원 권한 없음"));
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage());
            return ResponseEntity.status(409).body(new BaseResponseDTO(409, "프로필 수정 실패"));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(500).body(new BaseResponseDTO(500, "내부 서버 에러"));
        }

        return ResponseEntity.status(200).body(new BaseResponseDTO(200, "프로필 수정 성공"));
    }


    @DeleteMapping("/profile")
    public ResponseEntity<BaseResponseDTO> deleteMember () {
        log.debug("MemberController deleteMyAccount 호출됨");

        try {
            Integer statusCode = memberService.deleteMember();
            if (statusCode == 503)
                return ResponseEntity.status(503).body(new BaseResponseDTO(503, "카카오 연결 끊기 실패"));
        } catch (NotAuthenticatedMemberException e) {
            log.error(e.getMessage());
            return ResponseEntity.status(401).body(new BaseResponseDTO(401, "회원 권한 없음"));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(500).body(new BaseResponseDTO(500, "내부 서버 에러"));
        }

        return ResponseEntity.status(200).body(new BaseResponseDTO(200, "계정 삭제 성공"));

    }

    @GetMapping("/profile/{memberSeq}")
    public ResponseEntity<BaseDataResponseDTO<ResOtherMemberProfileDTO>> getOtherMemberProfile (@PathVariable("memberSeq") Long memberSeq) {
        log.debug("MemberController getOtherMemberProfile 호출됨");

        BaseDataResponseDTO<ResOtherMemberProfileDTO> resMemberProfile;
        ResOtherMemberProfileDTO profile;

        try {
            profile = memberService.getOtherMemberProfile(memberSeq);
        } catch (NotAuthenticatedMemberException e) {
            log.error(e.getMessage());
            resMemberProfile = new BaseDataResponseDTO<>(401, "회원 권한 없음", null);
            return ResponseEntity.status(401).body(resMemberProfile);
        } catch (NotFoundMemberException e) {
            log.error(e.getMessage());
            resMemberProfile = new BaseDataResponseDTO<>(404, "회원을 찾을 수 없음", null);
            return ResponseEntity.status(404).body(resMemberProfile);
        }
        catch (Exception e) {
            log.error(e.getMessage());
            resMemberProfile = new BaseDataResponseDTO<>(500, "내부 서버 에러", null);
            return ResponseEntity.status(500).body(resMemberProfile);
        }

        resMemberProfile = new BaseDataResponseDTO<>(200, "다른 회원정보 조회 성공", profile) ;
        return ResponseEntity.status(200).body(resMemberProfile);
    }

    @GetMapping("/profile/buy")
    public ResponseEntity<BaseDataResponseDTO<ResMemberProfileItemsDTO>> getMyBoughtItems () {
        log.debug("MemberController getMyBoughtItems 호출됨");

        BaseDataResponseDTO<ResMemberProfileItemsDTO> resMemberProfileBought;
        List<ItemOverviewDto> boughtItems;

        try {
            boughtItems = memberService.getMyBoughtItems();
        } catch (NotAuthenticatedMemberException e) {
            log.error(e.getMessage());
            resMemberProfileBought = new BaseDataResponseDTO<>(401, "회원 권한 없음", null);
            return ResponseEntity.status(401).body(resMemberProfileBought);
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage());
            resMemberProfileBought = new BaseDataResponseDTO<>(409, "구매한 물품 조회 실패", null);
            return ResponseEntity.status(409).body(resMemberProfileBought);
        } catch (Exception e) {
            log.error(e.getMessage());
            resMemberProfileBought = new BaseDataResponseDTO<>(500, "내부 서버 에러", null);
            return ResponseEntity.status(500).body(resMemberProfileBought);
        }

        resMemberProfileBought = new BaseDataResponseDTO<>(200, "구매한 물품 조회 성공",
                ResMemberProfileItemsDTO.builder().items(boughtItems).build());

        return ResponseEntity.status(200).body(resMemberProfileBought);
    }

    @GetMapping("/profile/likes")
    public ResponseEntity<BaseDataResponseDTO<ResMemberProfileLikedItemsDTO>> getMyLikedItems () {
        log.debug("MemberController getMyLikedItems 호출됨");

        BaseDataResponseDTO<ResMemberProfileLikedItemsDTO> resMemberProfileLikes;
        List<ItemOverviewLikedDto> LikedItems;

        try {
            LikedItems = memberService.getMyLikedItems();
        } catch (NotAuthenticatedMemberException e) {
            log.error(e.getMessage());
            resMemberProfileLikes = new BaseDataResponseDTO<>(401, "회원 권한 없음", null);
            return ResponseEntity.status(401).body(resMemberProfileLikes);
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage());
            resMemberProfileLikes = new BaseDataResponseDTO<>(409, "찜한 물품 조회 실패", null);
            return ResponseEntity.status(409).body(resMemberProfileLikes);
        } catch (Exception e) {
            log.error(e.getMessage());
            resMemberProfileLikes = new BaseDataResponseDTO<>(500, "내부 서버 에러", null);
            return ResponseEntity.status(500).body(resMemberProfileLikes);
        }

        resMemberProfileLikes = new BaseDataResponseDTO<>(200, "찜한 물품 조회 성공",
                ResMemberProfileLikedItemsDTO.builder().items(LikedItems).build());

        return ResponseEntity.status(200).body(resMemberProfileLikes);
    }

    @PostMapping("/report")
    public ResponseEntity<BaseResponseDTO> reportMember(@RequestBody ReqMemberReportDto reqMemberReportDto) {
        log.debug("MemberController reportMember 호출됨");

        try {
            Integer statusCode = memberService.reportMember(reqMemberReportDto.getMemberSeq());
            if (statusCode == 404)
                return ResponseEntity.status(404).body(new BaseResponseDTO(404, "신고할 회원을 찾을 수 없음"));
            if (statusCode == 400)
                return ResponseEntity.status(400).body(new BaseResponseDTO(400, "이미 신고한 회원"));
        } catch (NotAuthenticatedMemberException e) {
            log.error(e.getMessage());
            return ResponseEntity.status(401).body(new BaseResponseDTO(401, "회원 권한 없음"));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(500).body(new BaseResponseDTO(500, "내부 서버 에러"));
        }

        return ResponseEntity.status(200).body(new BaseResponseDTO(200, "계정 신고 성공"));
    }

    @GetMapping("/test")
    public ResponseEntity test() {

        memberService.test();

        return ResponseEntity.status(200).body(null);
    }
}