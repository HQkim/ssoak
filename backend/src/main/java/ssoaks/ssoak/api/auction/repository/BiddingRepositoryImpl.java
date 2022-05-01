package ssoaks.ssoak.api.auction.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import ssoaks.ssoak.api.auction.entity.Bidding;
import javax.persistence.EntityManager;

import static ssoaks.ssoak.api.auction.entity.QBidding.*;
import static ssoaks.ssoak.api.auction.entity.QItem.item;
import static ssoaks.ssoak.api.member.entity.QMember.member;

public class BiddingRepositoryImpl implements BiddingRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public BiddingRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Bidding getLatestBiddingByItemSeq(Long itemSeq) {

        return queryFactory.selectFrom(bidding)
                .join(bidding.item, item).fetchJoin()
                .join(bidding.buyer, member).fetchJoin()
                .where(bidding.item.seq.eq(itemSeq))
                .fetchOne();

    }
}
