package ssoaks.ssoak.api.member.repository;

import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;

import javax.persistence.EntityManager;

import java.util.List;

import static ssoaks.ssoak.api.auction.entity.QItem.item;
import static ssoaks.ssoak.api.member.entity.QBlock.block;
import static ssoaks.ssoak.api.member.entity.QMember.member;

public class BlockRepositoryImpl implements BlockRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    public BlockRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Integer countBlockByMemberSeq(Long memberSeq) {

        return queryFactory
                .select(block.count().intValue())
                .from(block)
                .where(block.member.seq.eq(memberSeq))
                .fetchOne();
    }

    @Override
    public List<Long> getMyBlackList(Long memberSeq) {

        return queryFactory
                .select(block.member.seq)
                .from(block)
                .where(block.reporter.seq.eq(memberSeq))
                .fetch();
    }

    @Override
    public List<Long> getMyAndCommonBlackList(Long memberSeq) {

        return queryFactory
                .select(member.seq)
                .from(member)
                .leftJoin(block).on(block.member.eq(member))
                .where(member.isBlocked.eq(true).or(block.seq.isNotNull()))
                .groupBy(member)
                .fetch();
    }


}
