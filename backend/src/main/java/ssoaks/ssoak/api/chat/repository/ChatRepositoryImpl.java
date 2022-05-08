package ssoaks.ssoak.api.chat.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Pageable;
import ssoaks.ssoak.api.chat.dto.response.QResChatDto;
import ssoaks.ssoak.api.chat.dto.response.ResChatDto;

import javax.persistence.EntityManager;
import java.util.List;

import static ssoaks.ssoak.api.chat.entity.QChat.*;

public class ChatRepositoryImpl implements ChatRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    public ChatRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }


    @Override
    public List<ResChatDto> getChatLogBySeqs(Long itemSeq, Long sellerSeq, Long buyerSeq) {

        return queryFactory.select(new QResChatDto(
                        chat.item.seq,
                        chat.seller.nickname,
                        chat.buyer.nickname,
                        chat.content,
                        chat.createdDate
                ))
                .from(chat)
                .where(chat.item.seq.eq(itemSeq).and(chat.buyer.seq.eq(buyerSeq))
                        .and(chat.seller.seq.eq(sellerSeq)))
                .orderBy(chat.createdDate.asc())
                .fetch();
    }

    @Override
    public Integer countMyChatRoomByMemberSeq(Long memberSeq) {

        return queryFactory.select(chat.count().intValue())
                .from(chat)
                .where(chat.seller.seq.eq(memberSeq).or(chat.buyer.seq.eq(memberSeq)))
                .groupBy(chat.item)
                .fetchOne();
    }

    @Override
    public List<ResChatDto> getChatRoomByMemberSeq(Pageable pageable, Long memberSeq) {

        List<ResChatDto> fetch = queryFactory.select(new QResChatDto(
                        chat.item.seq,
                        chat.seller.nickname,
                        chat.buyer.nickname,
                        chat.content.substring(0, 20),
                        chat.createdDate
                ))
                .from(chat)
                .where(chat.seller.seq.eq(memberSeq).or(chat.buyer.seq.eq(memberSeq)))
                .groupBy(chat.item).distinct()
                .offset((long) (pageable.getPageNumber() - 1) * pageable.getPageSize())
                .limit(pageable.getPageSize())
                .orderBy(chat.createdDate.desc())
                .fetch();

        return fetch;
    }
}
