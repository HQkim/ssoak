package ssoaks.ssoak.api.auction.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import ssoaks.ssoak.api.auction.dto.response.ItemImageSimpleInfoDto;
import ssoaks.ssoak.api.auction.dto.response.QItemImageSimpleInfoDto;
import ssoaks.ssoak.api.auction.entity.Image;
import ssoaks.ssoak.api.auction.entity.Item;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.List;

import static ssoaks.ssoak.api.auction.entity.QBidding.bidding;
import static ssoaks.ssoak.api.auction.entity.QImage.image;
import static ssoaks.ssoak.api.auction.entity.QItem.item;
import static ssoaks.ssoak.api.auction.entity.QLike.like;

public class ImageRepositoryImpl implements ImageRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    public ImageRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<ItemImageSimpleInfoDto> getSellingItemsImagesByMember(Long memberSeq) {

        List<ItemImageSimpleInfoDto> sellingList = queryFactory
                .select(new QItemImageSimpleInfoDto(
                        image.seq,
                        item.seq,
                        image.imageUrl
                ))
                .from(item)
                .leftJoin(image).on(image.item.eq(item))
                .where(item.member.seq.eq(memberSeq).and(item.endTime.after(LocalDateTime.now()))
                        .and(item.isSold.eq(false)))
                .groupBy(item)
                .fetch();

        return sellingList;

    }

    @Override
    public List<ItemImageSimpleInfoDto> getSoldItemsImagesByMember(Long memberSeq) {

        List<ItemImageSimpleInfoDto> soldList = queryFactory
                .select(new QItemImageSimpleInfoDto(
                        image.seq,
                        item.seq,
                        image.imageUrl
                ))
                .from(item)
                .leftJoin(image).on(image.item.eq(item))
                .where(item.member.seq.eq(memberSeq).and(item.endTime.before(LocalDateTime.now()))
                        .and(item.isSold.eq(true)))
                .groupBy(item)
                .fetch();

        return soldList;
    }

    @Override
    public List<ItemImageSimpleInfoDto> getUnsoldItemsImagesByMember(Long memberSeq) {
        List<ItemImageSimpleInfoDto> unsoldList = queryFactory
                .select(new QItemImageSimpleInfoDto(
                        image.seq,
                        item.seq,
                        image.imageUrl
                ))
                .from(item)
                .leftJoin(image).on(image.item.eq(item))
                .where(item.member.seq.eq(memberSeq).and(item.endTime.before(LocalDateTime.now()))
                        .and(item.isSold.eq(false)))
                .groupBy(item)
                .fetch();

        return unsoldList;
    }

    @Override
    public List<ItemImageSimpleInfoDto> getBoughtItemsImagesByMember(Long memberSeq) {
        List<ItemImageSimpleInfoDto> boughtList = queryFactory
                .select(new QItemImageSimpleInfoDto(
                        image.seq,
                        item.seq,
                        image.imageUrl
                ))
                .from(item)
                .join(bidding).on(bidding.item.eq(item))
                .leftJoin(image).on(image.item.eq(item))
                .where(bidding.buyer.seq.eq(memberSeq).and(bidding.isHammered.eq(true)))
                .groupBy(item)
                .fetch();

        return boughtList;
    }

    @Override
    public List<ItemImageSimpleInfoDto> getLikedItemsImagesByMember(Long memberSeq) {
        List<ItemImageSimpleInfoDto> likedList = queryFactory
                .select(new QItemImageSimpleInfoDto(
                        image.seq,
                        item.seq,
                        image.imageUrl
                ))
                .from(item)
                .join(like).on(like.item.eq(item))
                .leftJoin(image).on(image.item.eq(item))
                .where(like.member.seq.eq(memberSeq))
                .groupBy(item)
                .fetch();
        
        return likedList;
    }
}
