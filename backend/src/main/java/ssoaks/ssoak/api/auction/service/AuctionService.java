package ssoaks.ssoak.api.auction.service;

import org.springframework.web.multipart.MultipartFile;
import ssoaks.ssoak.api.auction.dto.request.ReqItemRegisterDto;
import ssoaks.ssoak.api.auction.dto.response.ResItemDto;
import ssoaks.ssoak.api.auction.entity.Item;

import java.util.List;


public interface AuctionService {

    Boolean createItem(ReqItemRegisterDto itemRegisterRequestDto, List<MultipartFile> itemImages);

    ResItemDto getItemDetail(Long itemSeq);

    void uploadItemImages(Item item, List<MultipartFile> itemImages);

}
