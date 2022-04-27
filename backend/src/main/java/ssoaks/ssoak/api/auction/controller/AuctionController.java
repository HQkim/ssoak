package ssoaks.ssoak.api.auction.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import ssoaks.ssoak.api.auction.dto.reqeust.ItemRegisterRequestDto;
import ssoaks.ssoak.api.member.entity.Member;
import ssoaks.ssoak.api.member.service.MemberService;
import ssoaks.ssoak.common.dto.BaseDataResponseDTO;

import javax.validation.Valid;

@Slf4j
@Controller
@RequestMapping("/api/action")
public class AuctionController {

//    @Autowired
//    private MemberService memberService;
//
//    @PostMapping
//    public ResponseEntity<BaseDataResponseDTO> registerItem(@Valid @RequestBody ItemRegisterRequestDto itemRegisterRequestDto) {
//
//        log.debug("registerItem - {}");
//        Member member = memberService.getMemberByAuthentication();
//    }

}
