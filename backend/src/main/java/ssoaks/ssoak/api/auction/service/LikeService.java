package ssoaks.ssoak.api.auction.service;

public interface LikeService {

    void like(Long itemSeq) throws Exception;

    void unLike(Long itemSeq);

    Boolean isLike(Long memberSeq, Long itemSeq);

}
