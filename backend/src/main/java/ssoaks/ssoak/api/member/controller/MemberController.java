package ssoaks.ssoak.api.member.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssoaks.ssoak.api.auction.dto.response.ItemOverviewDto;
import ssoaks.ssoak.api.member.dto.response.ResMemberProfileDTO;
import ssoaks.ssoak.api.member.dto.response.ResMemberProfileItemsDTO;
import ssoaks.ssoak.api.member.dto.response.ResOtherMemberProfileDTO;
import ssoaks.ssoak.api.member.exception.NotAuthenticatedMemberException;
import ssoaks.ssoak.api.member.exception.NotFoundMemberException;
import ssoaks.ssoak.api.member.service.MemberService;
import ssoaks.ssoak.common.dto.BaseDataResponseDTO;
import ssoaks.ssoak.common.dto.BaseResponseDTO;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/members/profile")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("")
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

    @GetMapping("/selling")
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
        } catch (Exception e) {
            log.error(e.getMessage());
            resMemberProfileSelling = new BaseDataResponseDTO<>(500, "내부 서버 에러", null);
            return ResponseEntity.status(500).body(resMemberProfileSelling);
        }

        resMemberProfileSelling = new BaseDataResponseDTO<ResMemberProfileItemsDTO>(200, "판매중 물품 조회 성공",
                ResMemberProfileItemsDTO.builder().itemOverviewDtos(sellingItems).build());

        return ResponseEntity.status(200).body(resMemberProfileSelling);
    }

    @GetMapping("/sold")
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
        } catch (Exception e) {
            log.error(e.getMessage());
            resMemberProfileSold = new BaseDataResponseDTO<>(500, "내부 서버 에러", null);
            return ResponseEntity.status(500).body(resMemberProfileSold);
        }

        resMemberProfileSold = new BaseDataResponseDTO<ResMemberProfileItemsDTO>(200, "판매완료 물품 조회 성공",
                ResMemberProfileItemsDTO.builder().itemOverviewDtos(soldItems).build());

        return ResponseEntity.status(200).body(resMemberProfileSold);
    }

    @GetMapping("/unsold")
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
        } catch (Exception e) {
            log.error(e.getMessage());
            resMemberProfileUnsold = new BaseDataResponseDTO<>(500, "내부 서버 에러", null);
            return ResponseEntity.status(500).body(resMemberProfileUnsold);
        }

        resMemberProfileUnsold = new BaseDataResponseDTO<ResMemberProfileItemsDTO>(200, "판매가 안된 물품 조회 성공",
                ResMemberProfileItemsDTO.builder().itemOverviewDtos(unsoldItems).build());

        return ResponseEntity.status(200).body(resMemberProfileUnsold);
    }

    @DeleteMapping("")
    public ResponseEntity<BaseResponseDTO> deleteMember () {
        log.debug("MemberController deleteMyAccount 호출됨");

        try {
            Integer statusCode = memberService.deleteMember();
            if (statusCode == 409)
                return ResponseEntity.status(409).body(new BaseResponseDTO(409, "계정 삭제 실패"));
        } catch (NotAuthenticatedMemberException e) {
            log.error(e.getMessage());
            return ResponseEntity.status(401).body(new BaseResponseDTO(401, "회원 권한 없음"));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(500).body(new BaseResponseDTO(500, "내부 서버 에러"));
        }

        return ResponseEntity.status(200).body(new BaseResponseDTO(200, "계정 삭제 성공"));

    }

    @GetMapping("/{memberSeq}")
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

    @GetMapping("/buy")
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
        } catch (Exception e) {
            log.error(e.getMessage());
            resMemberProfileBought = new BaseDataResponseDTO<>(500, "내부 서버 에러", null);
            return ResponseEntity.status(500).body(resMemberProfileBought);
        }

        resMemberProfileBought = new BaseDataResponseDTO<>(200, "구매한 물품 조회 성공",
                ResMemberProfileItemsDTO.builder().itemOverviewDtos(boughtItems).build());

        return ResponseEntity.status(200).body(resMemberProfileBought);
    }
}