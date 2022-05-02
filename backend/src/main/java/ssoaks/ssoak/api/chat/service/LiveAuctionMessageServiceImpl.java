package ssoaks.ssoak.api.chat.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssoaks.ssoak.api.auction.entity.Bidding;
import ssoaks.ssoak.api.auction.entity.Item;
import ssoaks.ssoak.api.auction.repository.BiddingRepository;
import ssoaks.ssoak.api.auction.repository.ItemRepository;
import ssoaks.ssoak.api.chat.dto.ReqLiveAuctionMessageDto;
import ssoaks.ssoak.api.chat.dto.ResLiveAuctionMessageDto;
import ssoaks.ssoak.api.member.entity.Member;
import ssoaks.ssoak.api.member.repository.MemberRepository;

import java.time.LocalDateTime;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class LiveAuctionMessageServiceImpl implements LiveAuctionMessageService{

    private final BiddingRepository biddingRepository;

    private final MemberRepository memberRepository;

    private final ItemRepository itemRepository;

    @Transactional
    @Override
    public ResLiveAuctionMessageDto sendAuctionMessage(ReqLiveAuctionMessageDto reqLiveAuctionMessageDto, Member member) {

        Long messageType = reqLiveAuctionMessageDto.getMessageType();

        Item item = itemRepository.findBySeq(reqLiveAuctionMessageDto.getItemSeq()).orElse(null);

        if (messageType == 1) {

            Bidding latestBidding = biddingRepository.getLatestBiddingByItemSeq(reqLiveAuctionMessageDto.getItemSeq());
            int price = Integer.parseInt(reqLiveAuctionMessageDto.getContent());

            if (latestBidding == null || latestBidding.getBiddingPrice() < price) {
                Bidding newBidding = Bidding.builder()
                        .item(item)
                        .buyer(member)
//                        .biddingDate(LocalDateTime.now())
                        .biddingPrice(price)
                        .isHammered(latestBidding.getIsHammered())
                        .build();

                biddingRepository.save(newBidding);
            } else {
                return null;
            }
        }
        return ResLiveAuctionMessageDto.builder()
                .itemSeq(reqLiveAuctionMessageDto.getItemSeq())
                .memberNickname(member.getNickname())
                .messageType(messageType)
                .content(reqLiveAuctionMessageDto.getContent())
                .createdAt(LocalDateTime.now())
                .build();
    }
}
