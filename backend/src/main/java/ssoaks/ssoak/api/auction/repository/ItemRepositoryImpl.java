package ssoaks.ssoak.api.auction.repository;

import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import ssoaks.ssoak.api.auction.dto.response.*;
import ssoaks.ssoak.api.auction.entity.Item;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.List;


import static ssoaks.ssoak.api.auction.entity.QBidding.bidding;
import static ssoaks.ssoak.api.auction.entity.QCategory.category;
import static ssoaks.ssoak.api.auction.entity.QItem.item;
import static ssoaks.ssoak.api.auction.entity.QItemCategory.itemCategory;
import static ssoaks.ssoak.api.auction.entity.QLike.like;
import static ssoaks.ssoak.api.auction.entity.QImage.image;

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
//                        image.imageUrl
                ))
                .from(item)
//                .leftJoin(item.biddings, bidding)
                .leftJoin(bidding).on(bidding.item.eq(item))
                .where(item.member.seq.eq(memberSeq).and(item.endTime.after(LocalDateTime.now()))
                        .and(item.isSold.eq(false)))
                .groupBy(item)
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
//                        item.title
                ))
                .from(item)
//                .leftJoin(item.biddings, bidding)
                .leftJoin(bidding).on(bidding.item.eq(item))    // OneToMany 안쓰기 위해서 바꿈. .leftJoin(item.biddings, bidding)과 같은 결과
                .where(item.member.seq.eq(memberSeq).and(item.endTime.before(LocalDateTime.now()))
                        .and(item.isSold.eq(true)))
                .groupBy(item)
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
//                        item.title
                ))
                .from(item)
//                .leftJoin(item.biddings, bidding)
                .leftJoin(bidding).on(bidding.item.eq(item))
                .where(item.member.seq.eq(memberSeq).and(item.endTime.before(LocalDateTime.now()))
                        .and(item.isSold.eq(false)))
                .groupBy(item)
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
                        bidding.biddingPrice.max().coalesce(0)    // groupby하면 어차피 1개가 되므로 바로 불러와도 된다.
//                        item.title
                ))
                .from(item)
//                .join(item.biddings, bidding)
                .join(bidding).on(bidding.item.eq(item))
                .where(bidding.buyer.seq.eq(memberSeq).and(bidding.isHammered.eq(true)))
                .groupBy(item)
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
//                        item.title
                ))
                .from(item)
//                .join(item.likes, like)
                .join(like).on(like.item.eq(item))
//                .leftJoin(item.biddings, bidding)
                .leftJoin(bidding).on(bidding.item.eq(item))
                .where(like.member.seq.eq(memberSeq))
                .groupBy(item)
                .fetch();

        return list_liked;
    }

    @Override
    public Integer countItemListByAuctionType(String keyword) {

        return queryFactory
                .select(item.count().intValue())
                .from(item)
                .where(item.auctionType.stringValue().eq(keyword)
                        .and(item.endTime.after(LocalDateTime.now())))
                .fetchOne();

    }

    @Override
    public List<AuctionListDto> getItemListByAuctionType(String keyword, Pageable pageable) {

        JPAQuery<AuctionListDto> query = queryFactory
                .select(new QAuctionListDto(
                        item.seq,
                        item.title,
                        item.startPrice,
                        item.startTime,
                        item.endTime,
                        item.auctionType,
                        item.biddingCount,
                        item.biddingPrice,
                        image.imageUrl,
                        item.member.seq,
                        item.member.nickname,
                        item.member.profileImageUrl,
                        category.categoryName
                        ))
                        .from(item)
                        .join(image).on(image.item.eq(item))
                        .join(itemCategory).on(itemCategory.item.eq(item))
                        .join(category).on(category.seq.eq(itemCategory.category.seq))
                        .where(item.auctionType.stringValue().eq(keyword)
                                .and(item.endTime.after(LocalDateTime.now())))
                        .groupBy(item)
                        .offset((long) (pageable.getPageNumber() - 1) * pageable.getPageSize())
                        .limit(pageable.getPageSize());

        for (Sort.Order order : pageable.getSort()) {
            if(order.getProperty().equals("createdDate")) { // 최신순
                query.orderBy(item.createdDate.desc());
            }
            else if(order.getProperty().equals("biddingCount")) { // 입찰 횟수순
                query.orderBy(item.biddingCount.desc());
            }
            else if(order.getProperty().equals("endTime")) { // 마감임박순
                query.orderBy(item.endTime.asc());
            }
        }

        return query.fetch();
    }

    @Override
    public Integer countLiveAuctionBeforeStart(String keyword) {
        return queryFactory
                .select(item.count().intValue())
                .from(item)
                .where(item.auctionType.stringValue().eq(keyword)
                        .and(item.startTime.after(LocalDateTime.now())))
                .fetchOne();
    }

    @Override
    public List<AuctionListDto> getLiveItemListBeforeStart(String keyword, Pageable pageable) {
        List<AuctionListDto> auctionListDtos = queryFactory
                .select(new QAuctionListDto(
                        item.seq,
                        item.title,
                        item.startPrice,
                        item.startTime,
                        item.endTime,
                        item.auctionType,
                        item.biddingCount,
                        item.biddingPrice,
                        image.imageUrl,
                        item.member.seq,
                        item.member.nickname,
                        item.member.profileImageUrl,
                        category.categoryName
                ))
                .from(item)
                .join(image).on(image.item.eq(item))
                .join(itemCategory).on(itemCategory.item.eq(item))
                .join(category).on(category.seq.eq(itemCategory.category.seq))
                .where(item.auctionType.stringValue().eq(keyword)
                        .and(item.startTime.after(LocalDateTime.now())))
                .groupBy(item)
                .offset((long) (pageable.getPageNumber() - 1) * pageable.getPageSize())
                .limit(pageable.getPageSize())
                .orderBy(item.startTime.asc())
                .fetch();

        return auctionListDtos;
    }
}
