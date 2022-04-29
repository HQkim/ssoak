package ssoaks.ssoak.api.auction.service;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import ssoaks.ssoak.api.auction.dto.request.ReqItemRegisterDto;
import ssoaks.ssoak.api.auction.dto.response.ResItemDto;
import ssoaks.ssoak.api.auction.entity.Item;
import ssoaks.ssoak.api.member.entity.Member;

import java.util.List;


public interface AuctionService {


    Boolean createItem(Member member, ReqItemRegisterDto itemRegisterRequestDto, List<MultipartFile> itemImages);

    ResItemDto getItemDetail(Long memberSeq, Long itemSeq);

    void uploadItemImages(Item item, List<MultipartFile> itemImages);

}
