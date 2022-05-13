package ssoaks.ssoak.api.auction.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import ssoaks.ssoak.api.auction.dto.request.FinishBiddingDto;
import ssoaks.ssoak.api.auction.dto.request.QFinishBiddingDto;
import ssoaks.ssoak.api.auction.dto.request.ReqSearchDto;
import ssoaks.ssoak.api.auction.dto.response.*;
import ssoaks.ssoak.api.auction.entity.Item;
import ssoaks.ssoak.api.auction.enums.AuctionType;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.List;



import static org.springframework.util.StringUtils.hasText;
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
                        item.biddingCount,
                        item.biddingPrice,
                        image.imageUrl
                ))
                .from(item)
                .join(image).on(image.item.eq(item))
                .where(item.member.seq.eq(memberSeq).and(item.endTime.after(LocalDateTime.now()))
                        .and(item.isSold.eq(false)))
                .groupBy(item)
                .orderBy(item.endTime.asc())    // 마감 임박순
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
                        item.biddingCount,
                        item.biddingPrice,
                        image.imageUrl
                ))
                .from(item)
                .join(image).on(image.item.eq(item))
                .where(item.member.seq.eq(memberSeq).and(item.endTime.before(LocalDateTime.now()))
                        .and(item.isSold.eq(true)))
                .groupBy(item)
                .orderBy(item.endTime.desc())    // 가장 최근에 끝난 경매가 위로 오도록
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
                        item.biddingCount,
                        item.biddingPrice,
                        image.imageUrl
                ))
                .from(item)
                .join(image).on(image.item.eq(item))
                .where(item.member.seq.eq(memberSeq).and(item.endTime.before(LocalDateTime.now()))
                        .and(item.isSold.eq(false)))
                .groupBy(item)
                .orderBy(item.endTime.desc())
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
                        item.biddingCount,
                        item.biddingPrice,
                        image.imageUrl
                ))
                .from(item)
                .join(image).on(image.item.eq(item))
                .where(item.buyer.seq.eq(memberSeq))
                .groupBy(item)
                .orderBy(item.modifiedDate.desc())
                .fetch();

        return list;
    }

    @Override
    public List<ItemOverviewLikedDto> getLikedItemOverviewsByMember(Long memberSeq, List<Long> blackList) {

        List<ItemOverviewLikedDto> listLiked = queryFactory
                .select(new QItemOverviewLikedDto(
                        item.seq,
                        item.title,
                        item.startPrice,
                        item.startTime,
                        item.endTime,
                        item.auctionType,
                        item.isSold,
                        item.biddingCount,
                        item.biddingPrice,
                        image.imageUrl,
                        item.seq.isNotNull()
                ))
                .from(item)
                .join(image).on(image.item.eq(item))
                .join(like).on(like.item.eq(item))
                .where(like.member.seq.eq(memberSeq)
                        .and(item.member.seq.notIn(blackList))
                        .and(item.member.isBlocked.eq(false))
                        .and(item.member.isDeleted.eq(false)))
                .groupBy(item)
                .fetch();

        return listLiked;
    }

    @Override
    public Integer countItemListByAuctionType(String keyword) {

        return queryFactory
                .select(item.count().intValue())
                .from(item)
                .where(item.auctionType.stringValue().eq(keyword)
//                        .and(item.startTime.before(LocalDateTime.now()))
//                        .and(item.endTime.after(LocalDateTime.now()))
                )
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
//                                .and(item.startTime.before(LocalDateTime.now()))
//                                .and(item.endTime.after(LocalDateTime.now()))
                        )
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
                query.where(item.startTime.before(LocalDateTime.now())
                        .and(item.endTime.after(LocalDateTime.now())))
                        .orderBy(item.endTime.asc());
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

    @Override
    public Integer countSearchItemsByKeyword(ReqSearchDto searchDto, Pageable pageable) {

        return queryFactory
                .select(item.count().intValue())
                .from(item)
                .where(item.isSold.eq(false)
                                .and(item.startTime.before(LocalDateTime.now()))
                                .and(item.endTime.after(LocalDateTime.now()))
                                .and(item.title.contains(searchDto.getKeyword()))
                                .or(item.content.contains(searchDto.getKeyword())),
                        auctionTypeEq(searchDto.getAuctionType()),
                        categoryEq(searchDto.getCategory()),
                        timeBetween(searchDto.getStartTime(), searchDto.getEndTime()),
                        priceBetween(searchDto.getStartPrice(), searchDto.getEndPrice())
                )
                .fetchOne();
    }

    @Override
    public List<AuctionListDto> getSearchItemsByKeyword(ReqSearchDto searchDto, Pageable pageable) {
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
                .where(item.isSold.eq(false)
                                .and(item.startTime.before(LocalDateTime.now()))
                                .and(item.endTime.after(LocalDateTime.now()))
                                .and(item.title.contains(searchDto.getKeyword()))
                                .or(item.content.contains(searchDto.getKeyword())),
                        auctionTypeEq(searchDto.getAuctionType()),
                        categoryEq(searchDto.getCategory()),
                        timeBetween(searchDto.getStartTime(), searchDto.getEndTime()),
                        priceBetween(searchDto.getStartPrice(), searchDto.getEndPrice())
                )
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
        }
        return query.fetch();
    }

    @Override
    public List<FinishBiddingDto> getSuccessfulAuction() {
        List<FinishBiddingDto> auctionListDtos = queryFactory
                .select(new QFinishBiddingDto(
                        item.seq,
                        item.biddingCount,
                        item.isSold,
                        item.isFinished
                ))
                .from(item)
                .where(item.isSold.eq(false)
                        .and(item.isFinished.eq(false))
                        .and(item.endTime.before(LocalDateTime.now()))
                                .and(item.biddingCount.goe(1))
                        )
                .fetch();
        return auctionListDtos;
    }

    @Override
    public List<FinishBiddingDto> getFiledAuction() {
        List<FinishBiddingDto> auctionListDtos = queryFactory
                .select(new QFinishBiddingDto(
                        item.seq,
                        item.biddingCount,
                        item.isSold,
                        item.isFinished
                ))
                .from(item)
                .where(item.isSold.eq(false)
                        .and(item.isFinished.eq(false))
                        .and(item.endTime.before(LocalDateTime.now()))
                        .and(item.biddingCount.eq(0))
                )
                .fetch();
        return auctionListDtos;
    }


    private BooleanExpression auctionTypeEq(String auctionType) {
        return hasText(auctionType) ? item.auctionType.stringValue().eq(auctionType) : null;
    }

    private BooleanExpression categoryEq(String categoryParam) {
        return hasText(categoryParam) ? category.categoryName.eq(categoryParam) : null;
    }

    private BooleanExpression timeBetween(LocalDateTime startTime, LocalDateTime endTime) {
        return (startTime != null) ?
                item.startTime.after(startTime).and(item.endTime.before(endTime)) : null;
    }

    private BooleanExpression priceBetween(Integer startPrice, Integer endPrice){
        return (startPrice != null) ? item.biddingPrice.between(startPrice, endPrice) : null;
    }
}
