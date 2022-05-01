package ssoaks.ssoak.api.member.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ssoaks.ssoak.api.auction.dto.response.ItemOverviewDto;
import ssoaks.ssoak.api.member.dto.response.ResMemberProfileDTO;
import ssoaks.ssoak.api.member.dto.response.ResMemberProfileItemsDTO;
import ssoaks.ssoak.api.member.entity.Member;
import ssoaks.ssoak.api.member.exception.NotFoundMemberException;
import ssoaks.ssoak.api.member.service.MemberService;
import ssoaks.ssoak.common.dto.BaseDataResponseDTO;

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
        } catch (NotFoundMemberException e) {
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
        } catch (NotFoundMemberException e) {
            log.error(e.getMessage());
            resMemberProfileSelling = new BaseDataResponseDTO<>(401, "회원 권한 없음", null);
            return ResponseEntity.status(401).body(resMemberProfileSelling);
        } catch (Exception e) {
            log.error(e.getMessage());
            resMemberProfileSelling = new BaseDataResponseDTO<>(500, "내부 서버 에러", null);
            return ResponseEntity.status(500).body(resMemberProfileSelling);
        }

        resMemberProfileSelling = new BaseDataResponseDTO<ResMemberProfileItemsDTO>(200, "판매중 아이템 조회 성공",
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
        } catch (NotFoundMemberException e) {
            log.error(e.getMessage());
            resMemberProfileSold = new BaseDataResponseDTO<>(401, "회원 권한 없음", null);
            return ResponseEntity.status(401).body(resMemberProfileSold);
        } catch (Exception e) {
            log.error(e.getMessage());
            resMemberProfileSold = new BaseDataResponseDTO<>(500, "내부 서버 에러", null);
            return ResponseEntity.status(500).body(resMemberProfileSold);
        }

        resMemberProfileSold = new BaseDataResponseDTO<ResMemberProfileItemsDTO>(200, "판매완료 아이템 조회 성공",
                ResMemberProfileItemsDTO.builder().itemOverviewDtos(soldItems).build());

        return ResponseEntity.status(200).body(resMemberProfileSold);
    }
}