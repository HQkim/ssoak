package ssoaks.ssoak.api.member.repository;


import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import ssoaks.ssoak.api.auction.enums.AuctionType;
import ssoaks.ssoak.api.member.dto.response.LiveAuctionAlarmDto;
import ssoaks.ssoak.api.member.dto.response.QLiveAuctionAlarmDto;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static ssoaks.ssoak.api.auction.entity.QItem.item;
import static ssoaks.ssoak.api.auction.entity.QLike.like;
import static ssoaks.ssoak.api.member.entity.QMember.member;

public class MemberRepositoryImpl implements MemberRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    public MemberRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
        }

    @Override
    public List<LiveAuctionAlarmDto> getLikedLiveAuctionMember() {
        List<LiveAuctionAlarmDto> likedMembers = queryFactory
                .select(new QLiveAuctionAlarmDto(
                        like.item.seq,
                        like.member.seq
                ))
                .from(like)
                .leftJoin(item).on(like.item.eq(item))
                .where(item.auctionType.eq(AuctionType.valueOf("LIVE"))
//                        item.startTime.between(LocalDateTime.now().minusMinutes(10),LocalDateTime.now().minusMinutes(15)),
//                        item.startTime.after(LocalDateTime.now().minusMinutes(14)),
//                        item.startTime.before(LocalDateTime.now().minusMinutes(15))
                )
                .fetch();

        return likedMembers;
    }
}
