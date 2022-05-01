package ssoaks.ssoak.api.auction.service;

import ssoaks.ssoak.api.member.entity.Member;

public interface LikeService {

    void like(Long itemSeq) throws Exception;

    void unLike(Long itemSeq);

    Boolean isLike(Long memberSeq, Long itemSeq);

}
