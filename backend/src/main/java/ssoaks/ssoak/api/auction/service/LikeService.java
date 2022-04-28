package ssoaks.ssoak.api.auction.service;

import ssoaks.ssoak.api.member.entity.Member;

public interface LikeService {

    void like(Member member, Long itemSeq) throws Exception;

    void unLike(Member member, Long itemSeq);

    Boolean isLike(Long memberSeq, Long itemSeq);

}
