package ssoaks.ssoak.api.auction.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ssoaks.ssoak.api.auction.dto.request.ReqBiddingRegisterDto;
import ssoaks.ssoak.api.auction.dto.request.ReqItemChangeDto;
import ssoaks.ssoak.api.auction.dto.request.ReqItemRegisterDto;
import ssoaks.ssoak.api.auction.dto.response.BiddingSimpleInfoDto;
import ssoaks.ssoak.api.auction.dto.response.ResItemDto;
import ssoaks.ssoak.api.auction.dto.response.ResItemSeqDto;
import ssoaks.ssoak.api.auction.exception.NotAllowedChangeItemException;
import ssoaks.ssoak.api.auction.service.AuctionService;
import ssoaks.ssoak.api.auction.service.BiddingService;
import ssoaks.ssoak.api.auction.service.LikeService;
import ssoaks.ssoak.api.member.service.MemberService;
import ssoaks.ssoak.common.dto.BaseDataResponseDTO;
import ssoaks.ssoak.common.dto.BaseResponseDTO;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auctions")
public class AuctionController {

    private final AuctionService auctionService;
    private final LikeService likeService;
    private final BiddingService biddingService;

    @PostMapping
    public ResponseEntity<BaseDataResponseDTO> registerItem(ReqItemRegisterDto reqItemRegister) {
        log.debug("물품생성 - {}", reqItemRegister);
        ResItemSeqDto itemSeqDto = null;
        try {
            itemSeqDto = auctionService.createItem(reqItemRegister);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(409).body(new BaseDataResponseDTO(409, "물품 등록에 실패하였습니다.", itemSeqDto));
        }
        return ResponseEntity.status(201).body(new BaseDataResponseDTO(201, "물품 등록 성공", itemSeqDto));
    }


    @PostMapping("/test")
    public ResponseEntity<BaseResponseDTO> testImage(@RequestPart(value = "itemImages") List<MultipartFile> itemImages) {
        log.debug("이미지 업로드 테스트 - testImage 호출");
        try {
            auctionService.createImageTest(itemImages);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(409).body(new BaseResponseDTO(409, "물품 등록에 실패하였습니다."));
        }
        return ResponseEntity.status(201).body(new BaseResponseDTO(201, "물품 등록 성공"));
    }


    @PatchMapping("/{itemSeq}")
    public ResponseEntity<BaseDataResponseDTO> changeItem(@PathVariable("itemSeq") Long itemSeq,
                                                      ReqItemChangeDto reqItemChangeDto) {
        log.debug("물품수정  seq- {} dto-{}", itemSeq,reqItemChangeDto);
        System.out.println("===물품수정=====> reqItemChangeDto : " + reqItemChangeDto);
        ResItemSeqDto resItemSeqDto = ResItemSeqDto.builder().itemSeq(itemSeq).build();
        try {
            resItemSeqDto = auctionService.changeItem(itemSeq, reqItemChangeDto);
        }catch (IllegalArgumentException e) {
            log.error(e.getMessage());
            return ResponseEntity.status(404).body(new BaseDataResponseDTO(404, e.getMessage(), null));
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
        log.debug("물품삭제 - {}", itemSeq);
        try {
            auctionService.deleteItem(itemSeq);
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage());
            return ResponseEntity.status(404).body(new BaseResponseDTO(404, "존재하지 않는 물품입니다"));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(409).body(new BaseResponseDTO(409, "물품 삭제에 실패했습니다"));
        }
        return ResponseEntity.status(204).body(new BaseResponseDTO(204, "물품 삭제 성공"));
    }


    @GetMapping("/{itemSeq}")
    public ResponseEntity<BaseDataResponseDTO> getItem(@PathVariable("itemSeq") Long itemSeq) {
        log.debug("물품상세조회 - {}", itemSeq);
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


    @PostMapping("/{itemSeq}/like")
    public ResponseEntity<BaseResponseDTO> like(@PathVariable("itemSeq") Long itemSeq) {
        log.debug("물품 좋아요 - {}", itemSeq);
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


    @DeleteMapping("/{itemSeq}/like")
    public ResponseEntity<BaseResponseDTO> unlike(@PathVariable("itemSeq") Long itemSeq) {
        log.debug("물품좋아요 취소 - {}", itemSeq);
        try {
            likeService.unLike(itemSeq);
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage());
            return ResponseEntity.status(404).body(new BaseResponseDTO(404, "존재하지 않는 물품입니다."));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(409).body(new BaseResponseDTO(409, "좋아요 취소에 실패했습니다."));
        }
        return ResponseEntity.status(200).body(new BaseResponseDTO(204, "좋아요를 취소했습니다."));
    }


    @PostMapping("/{itemSeq}/bidding")
    public ResponseEntity<BaseDataResponseDTO> registerBidding(@PathVariable("itemSeq") Long itemSeq,
                                                               ReqBiddingRegisterDto biddingDto) {
        log.debug("일반경매 입찰 seq - {}, dto - {}", itemSeq, biddingDto);
        BiddingSimpleInfoDto ResBidding = null;
        try {
            ResBidding = biddingService.createBidding(itemSeq, biddingDto);
        }catch (IllegalArgumentException e) {
            log.error(e.getMessage());
            return ResponseEntity.status(404).body(new BaseDataResponseDTO(404, e.getMessage(), ResBidding));
        } catch (NotAllowedChangeItemException e) {
            log.error(e.getMessage());
            return ResponseEntity.status(403).body(new BaseDataResponseDTO(403, e.getMessage(), ResBidding));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(409).body(new BaseDataResponseDTO(409, e.getMessage(), ResBidding));
        }
        return ResponseEntity.status(201).body(new BaseDataResponseDTO(201, "입찰 성공", ResBidding));
    }

    //낙찰
//    @PostMapping("/{itemSeq}/hammered")
//    public ResponseEntity<BaseDataResponseDTO> successBidding(@PathVariable("itemSeq") Long itemSeq,
//                                                              ReqBiddingRegisterDto biddingDto) {
//        log.debug("일반경매 낙찰 seq- {} , dto- {}", itemSeq, biddingDto);
//
//
//        return ResponseEntity.status(201).body(new BaseDataResponseDTO(201, "낙찰 성공", ));
//
//    }
}
