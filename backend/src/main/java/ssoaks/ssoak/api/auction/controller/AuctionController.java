package ssoaks.ssoak.api.auction.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ssoaks.ssoak.api.auction.dto.request.ReqItemChangeDto;
import ssoaks.ssoak.api.auction.dto.request.ReqItemRegisterDto;
import ssoaks.ssoak.api.auction.dto.response.ResItemDto;
import ssoaks.ssoak.api.auction.dto.response.ResItemSeqDto;
import ssoaks.ssoak.api.auction.exception.NotAllowedChangeItemException;
import ssoaks.ssoak.api.auction.service.AuctionService;
import ssoaks.ssoak.api.auction.service.LikeService;
import ssoaks.ssoak.api.member.service.MemberService;
import ssoaks.ssoak.common.dto.BaseDataResponseDTO;
import ssoaks.ssoak.common.dto.BaseResponseDTO;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auctions")
public class AuctionController {

    private final MemberService memberService;

    private final AuctionService auctionService;

    private final LikeService likeService;

    // 물품 생성
    @PostMapping
    public ResponseEntity<BaseDataResponseDTO> registerItem(@Valid @RequestPart(value = "reqItemRegister") ReqItemRegisterDto reqItemRegisterDto,
                                                        @RequestPart(value = "itemImages") List<MultipartFile> itemImages) {
        ResItemSeqDto itemSeqDto = null;
        try {
            itemSeqDto = auctionService.createItem(reqItemRegisterDto, itemImages);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(409).body(new BaseDataResponseDTO(409, "물품 등록에 실패하였습니다.", itemSeqDto));
        }
        return ResponseEntity.status(201).body(new BaseDataResponseDTO(201, "물품 등록 성공", itemSeqDto));
    }

    // 임시 이미지 업로드 테스트 api
    @PostMapping("/test")
    public ResponseEntity<BaseResponseDTO> testImage(@RequestPart(value = "itemImages") List<MultipartFile> itemImages) {
        try {
            auctionService.createImageTest(itemImages);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(409).body(new BaseResponseDTO(409, "물품 등록에 실패하였습니다."));
        }
        return ResponseEntity.status(201).body(new BaseResponseDTO(201, "물품 등록 성공"));
    }

    // 물품 수정 -> 진행중
    @PatchMapping("/{itemSeq}")
    public ResponseEntity<BaseDataResponseDTO> changeItem(@PathVariable("itemSeq") Long itemSeq,
                                                      @Valid @RequestPart(value = "item") ReqItemChangeDto reqItemChangeDto,
                                                      @RequestPart(value = "itemImages") List<MultipartFile> itemImages) {
        ResItemSeqDto resItemSeqDto = ResItemSeqDto.builder().itemSeq(itemSeq).build();
        try {
            auctionService.changeItem(itemSeq, reqItemChangeDto, itemImages);
        } catch (NotAllowedChangeItemException e) {
            log.error(e.getMessage());
            return ResponseEntity.status(409).body(new BaseDataResponseDTO(409, e.getMessage(), resItemSeqDto));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(409).body(new BaseDataResponseDTO(409, "물품 수정 실패", resItemSeqDto));
        }
        return ResponseEntity.status(201).body(new BaseDataResponseDTO(201, "물품 수정 성공", resItemSeqDto));
    }

    @DeleteMapping("/{itemSeq}")
    public ResponseEntity<BaseResponseDTO> deleteItem(@PathVariable("itemSeq") Long itemSeq) {
        try {
            auctionService.deleteItem(itemSeq);
        } catch (IllegalArgumentException e) {

        } catch (Exception e) {

        }
        return null;
    }

    // 물품 상세 조회
    @GetMapping("/{itemSeq}")
    public ResponseEntity<BaseDataResponseDTO> getItem(@PathVariable("itemSeq") Long itemSeq) {

        ResItemDto resItemDto = null;
        try {
            resItemDto = auctionService.getItemDetail(itemSeq);
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage());
            return ResponseEntity.status(404).body(new BaseDataResponseDTO(404, "존재하지 않는 물품입니다.", resItemDto));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(409).body(new BaseDataResponseDTO<>(409, "물품 조회에 실패했습니다", resItemDto));
        }

        return ResponseEntity.status(200).body(new BaseDataResponseDTO<>(200, "물품 조회에 성공했습니다.", resItemDto));
    }

    // 물품 좋아요
    @PostMapping("/{itemSeq}/like")
    public ResponseEntity<BaseResponseDTO> like(@PathVariable("itemSeq") Long itemSeq) {

        try {
            likeService.like(itemSeq);
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage());
            return ResponseEntity.status(404).body(new BaseResponseDTO(404, "존재하지 않는 물품입니다."));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(405).body(new BaseResponseDTO(405, "이미 좋아요한 물품입니다."));
        }
        return ResponseEntity.status(201).body(new BaseResponseDTO(201, "좋아요를 눌렀습니다."));
    }

    // 물품 좋아요 취소
    @DeleteMapping("/{itemSeq}/like")
    public ResponseEntity<BaseResponseDTO> unlike(@PathVariable("itemSeq") Long itemSeq) {

        try {
            likeService.unLike(itemSeq);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(new BaseResponseDTO(404, "물품을 찾을 수 없습니다."));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new BaseResponseDTO(500, "좋아요 취소에 실패했습니다."));
        }
        return ResponseEntity.status(200).body(new BaseResponseDTO(204, "좋아요를 취소했습니다."));
    }

}
