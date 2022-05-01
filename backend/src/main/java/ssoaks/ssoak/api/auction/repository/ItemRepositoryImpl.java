package ssoaks.ssoak.api.auction.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.eclipse.jdt.internal.compiler.ast.Expression;
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

        List<ItemOverviewDto> list = queryFactory
                .select(new QItemOverviewDto(
                        item.seq,
                        item.title,
                        item.startPrice,
                        item.startTime,
                        item.endTime,
                        item.auctionType,
                        item.isSold,
                        item.biddings.size(),
                        bidding.biddingPrice.max().coalesce(0)
                ))
                .from(item)
                .join(item.member, member)
                .leftJoin(item.biddings, bidding).on(bidding.item.eq(item)).groupBy(item)
                .where(item.member.seq.eq(memberSeq).and(item.endTime.after(LocalDateTime.now()))
                        .and(item.isSold.eq(false)))
                .fetch();

        return list;
    }

    @Override
    public List<ItemOverviewDto> getSoldItemsByMember (Long memberSeq) {

        List<ItemOverviewDto> list = queryFactory
                .select(new QItemOverviewDto(
                        item.seq,
                        item.title,
                        item.startPrice,
                        item.startTime,
                        item.endTime,
                        item.auctionType,
                        item.isSold,
                        item.biddings.size(),
                        bidding.biddingPrice.max().coalesce(0)
                ))
                .from(item)
                .join(item.member, member)
                .leftJoin(item.biddings, bidding).on(bidding.item.eq(item)).groupBy(item)
                .where(item.member.seq.eq(memberSeq).and(item.endTime.before(LocalDateTime.now()))
                        .and(item.isSold.eq(true)))
                .fetch();

        return list;
    }

    @Override
    public List<ItemOverviewDto> getUnsoldItemsByMember(Long memberSeq) {

        List<ItemOverviewDto> list = queryFactory
                .select(new QItemOverviewDto(
                        item.seq,
                        item.title,
                        item.startPrice,
                        item.startTime,
                        item.endTime,
                        item.auctionType,
                        item.isSold,
                        item.biddings.size().coalesce(0),
                        bidding.biddingPrice.max().coalesce(0)
                ))
                .from(item)
                .join(item.member, member)
                .leftJoin(item.biddings, bidding).on(bidding.item.eq(item)).groupBy(item)
                .where(item.member.seq.eq(memberSeq).and(item.endTime.before(LocalDateTime.now()))
                        .and(item.isSold.eq(false)))
                .fetch();

        return list;

    }
}
