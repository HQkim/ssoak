package ssoaks.ssoak.api.auction.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import ssoaks.ssoak.api.auction.dto.request.ReqItemRegisterDto;
import ssoaks.ssoak.api.auction.service.AuctionService;
import ssoaks.ssoak.api.member.entity.Member;
import ssoaks.ssoak.api.member.service.MemberService;
import ssoaks.ssoak.common.dto.BaseResponseDTO;

import javax.validation.Valid;

@Slf4j
@Controller
@RequestMapping("/api/v1/auctions")
public class AuctionController {

    @Autowired
    private MemberService memberService;

    @Autowired
    private AuctionService auctionService;

    @PostMapping
    public ResponseEntity<BaseResponseDTO> registerItem(@Valid @RequestPart(value = "reqItemRegister") ReqItemRegisterDto reqItemRegisterDto) { //, List<MultipartFile> images

        log.debug("registerItem - {}", reqItemRegisterDto);
        Member member = memberService.getMemberByAuthentication();
        // 경매 생성
        try{
            if(!auctionService.createItem(member,reqItemRegisterDto)) {
                return ResponseEntity.status(409).body(new BaseResponseDTO(409, "이미 등록된 물품입니다."));
            }
        }catch (Exception e) {
            return ResponseEntity.status(409).body(new BaseResponseDTO(409, "물품 등록에 실패하였습니다."));
        }
        return  ResponseEntity.status(201).body(new BaseResponseDTO(201, "물품 등록 성공"));

    }

}
