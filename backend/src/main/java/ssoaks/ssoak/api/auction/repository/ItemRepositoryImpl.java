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
import static ssoaks.ssoak.api.auction.entity.QLike.like;
import static ssoaks.ssoak.api.member.entity.QMember.member;

public class ItemRepositoryImpl implements ItemRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    public ItemRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<ItemOverviewDto> getSellingItemOverviewsByMember(Long memberSeq) {

        List<ItemOverviewDto> list = queryFactory
                .select(new QItemOverviewDto(
                        item.seq,
                        item.title,
                        item.startPrice,
                        item.startTime,
                        item.endTime,
                        item.auctionType,
                        item.isSold,
                        bidding.biddingPrice.count().intValue().coalesce(0),
                        bidding.biddingPrice.max().coalesce(0)
                ))
                .from(item)
                .leftJoin(item.biddings, bidding).groupBy(item)
                .where(item.member.seq.eq(memberSeq).and(item.endTime.after(LocalDateTime.now()))
                        .and(item.isSold.eq(false)))
                .fetch();

        return list;
    }

    @Override
    public List<ItemOverviewDto> getSoldItemOverviewsByMember(Long memberSeq) {

        List<ItemOverviewDto> list = queryFactory
                .select(new QItemOverviewDto(
                        item.seq,
                        item.title,
                        item.startPrice,
                        item.startTime,
                        item.endTime,
                        item.auctionType,
                        item.isSold,
                        bidding.biddingPrice.count().intValue().coalesce(0),
                        bidding.biddingPrice.max().coalesce(0)
                ))
                .from(item)
                .leftJoin(item.biddings, bidding).groupBy(item)
                .where(item.member.seq.eq(memberSeq).and(item.endTime.before(LocalDateTime.now()))
                        .and(item.isSold.eq(true)))
                .fetch();

        return list;
    }

    @Override
    public List<ItemOverviewDto> getUnsoldItemOverviewsByMember(Long memberSeq) {

        List<ItemOverviewDto> list = queryFactory
                .select(new QItemOverviewDto(
                        item.seq,
                        item.title,
                        item.startPrice,
                        item.startTime,
                        item.endTime,
                        item.auctionType,
                        item.isSold,
                        bidding.biddingPrice.count().intValue().coalesce(0),
                        bidding.biddingPrice.max().coalesce(0)
                ))
                .from(item)
                .leftJoin(item.biddings, bidding).groupBy(item)
                .where(item.member.seq.eq(memberSeq).and(item.endTime.before(LocalDateTime.now()))
                        .and(item.isSold.eq(false)))
                .fetch();

        return list;
    }

    @Override
    public List<Item> getSoldItemsByMember(Long memberSeq) {

        List<Item> list = queryFactory
                .select(item)
                .from(item)
                .where(item.member.seq.eq(memberSeq).and(item.isSold.eq(true)))
                .fetch();

        return list;
    }

    @Override
    public List<ItemOverviewDto> getBoughtItemOverviewsByMember(Long memberSeq) {

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
//                        bidding.biddingPrice.count().intValue().coalesce(0), // bidding에 대한 조건을 걸었기 때문에 이렇게 하지말고 위처럼 새로 sub쿼리 날려야함
                        bidding.biddingPrice.max().coalesce(0)      // groupby하면 어차피 1개가 되므로 바로 불러와도 된다.
                ))
                .from(item)
                .join(item.biddings, bidding).groupBy(item)
                .where(bidding.buyer.seq.eq(memberSeq).and(bidding.isHammered.eq(true)))
                .fetch();

        return list;
    }

    @Override
    public List<ItemOverviewDto> getLikedItemOverviewsByMember(Long memberSeq) {

        List<ItemOverviewDto> list_liked = queryFactory
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
                .join(item.likes, like)
                .leftJoin(item.biddings, bidding).groupBy(item)
                .where(like.member.seq.eq(memberSeq))
                .fetch();

        return list_liked;
    }
}
