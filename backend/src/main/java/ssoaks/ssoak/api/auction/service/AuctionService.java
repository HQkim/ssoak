package ssoaks.ssoak.api.auction.service;

import ssoaks.ssoak.api.auction.dto.request.ReqItemRegisterDto;
import ssoaks.ssoak.api.member.entity.Member;



public interface AuctionService {

    Boolean createItem(Member member, ReqItemRegisterDto itemRegisterRequestDto); // List<MultipartFile> images
}
