package ssoaks.ssoak.api.auction.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import ssoaks.ssoak.api.auction.dto.response.ItemOverviewDto;
import ssoaks.ssoak.api.auction.dto.response.QItemOverviewDto;
import ssoaks.ssoak.api.auction.entity.Item;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.List;

import static ssoaks.ssoak.api.auction.entity.QBidding.bidding;
import static ssoaks.ssoak.api.auction.entity.QItem.item;
import static ssoaks.ssoak.api.member.entity.QMember.member;

public class ItemRepositoryImpl implements ItemRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    public ItemRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<ItemOverviewDto> getSellingItemsByMember (Long memberSeq) {
        // 참여자수 뽑아야함
        return queryFactory
                .select(new QItemOverviewDto(
                        item.seq,
                        item.title,
                        item.startPrice,
                        item.startTime,
                        item.endTime,
                        item.auctionType,
                        item.isSold,
                        bidding.buyer.countDistinct().intValue(),
                        bidding.biddingPrice.max()
                ))
                .from(item)
                .leftJoin(item.biddings, bidding).groupBy(item)
                .where(item.member.seq.eq(memberSeq).and(item.endTime.after(LocalDateTime.now()))
                        .and(item.isSold.eq(false))
                )
                .fetch();
    }
}
