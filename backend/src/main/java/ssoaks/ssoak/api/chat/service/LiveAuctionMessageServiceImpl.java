package ssoaks.ssoak.api.chat.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssoaks.ssoak.api.auction.entity.Bidding;
import ssoaks.ssoak.api.auction.entity.Item;
import ssoaks.ssoak.api.auction.repository.BiddingRepository;
import ssoaks.ssoak.api.auction.repository.ItemRepository;
import ssoaks.ssoak.api.chat.dto.request.ReqLiveAuctionMessageDto;
import ssoaks.ssoak.api.chat.dto.request.ReqLiveAuctionOpeningDto;
import ssoaks.ssoak.api.chat.dto.response.ResLiveAuctionMessageDto;
import ssoaks.ssoak.api.chat.dto.response.ResLiveAuctionOpeningDto;
import ssoaks.ssoak.api.chat.exception.NotAcceptableBiddingException;
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
    public ResLiveAuctionMessageDto sendAuctionMessage(ReqLiveAuctionMessageDto reqLiveAuctionMessageDto) {

        Long messageType = reqLiveAuctionMessageDto.getMessageType();
        Member member = memberRepository.findBySeq(reqLiveAuctionMessageDto.getMemberSeq())
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 회원입니다"));

        Item item = itemRepository.findBySeq(reqLiveAuctionMessageDto.getItemSeq())
                .orElseThrow(() -> new IllegalArgumentException("해당 물품을 찾을 수 없습니다."));

        if (messageType == 1) {

            Bidding latestBidding = biddingRepository.getLatestBiddingByItemSeq(reqLiveAuctionMessageDto.getItemSeq());
            int price = Integer.parseInt(reqLiveAuctionMessageDto.getContent());

            if (latestBidding == null || latestBidding.getBiddingPrice() < price) {
                Bidding newBidding = Bidding.builder()
                        .item(item)
                        .buyer(member)
                        .biddingPrice(price)
                        .isHammered(false)
                        .build();

                biddingRepository.save(newBidding);
            } else {
                throw new NotAcceptableBiddingException("최고 입찰가보다 낮은 입찰입니다.");
            }
        }
        return ResLiveAuctionMessageDto.builder()
                .itemSeq(reqLiveAuctionMessageDto.getItemSeq())
                .memberSeq(reqLiveAuctionMessageDto.getMemberSeq())
                .memberNickname(member.getNickname())
                .messageType(messageType)
                .content(reqLiveAuctionMessageDto.getContent())
                .createdAt(LocalDateTime.now())
                .build();
    }

    @Override
    public ResLiveAuctionOpeningDto sendOpeningMessage(ReqLiveAuctionOpeningDto reqLiveAuctionOpeningDto) {

        String contents;
        Member member = memberRepository.findBySeq(reqLiveAuctionOpeningDto.getMemberSeq())
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 회원입니다"));

        Bidding highestBidding = biddingRepository.findTop1ByItemSeqOrderBySeqDesc(
                reqLiveAuctionOpeningDto.getItemSeq()).orElse(null);

        if (highestBidding == null) {
            contents = "현재 입찰이 없습니다";
        } else {
            contents = String.valueOf(highestBidding.getBiddingPrice());
        }

        return ResLiveAuctionOpeningDto.builder()
                .itemSeq(reqLiveAuctionOpeningDto.getItemSeq())
                .memberSeq(reqLiveAuctionOpeningDto.getMemberSeq())
                .memberNickname(member.getNickname())
                .content("현재 최고 입찰가는 " + contents + "원 입니다.")
                .createdAt(LocalDateTime.now())
                .build();
    }
}
