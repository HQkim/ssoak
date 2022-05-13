package ssoaks.ssoak.api.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssoaks.ssoak.api.member.entity.Block;

import java.util.Optional;


public interface BlockRepository extends JpaRepository<Block, Long> {

    Optional<Block> findBlockByReporterSeqAndMemberSeq(Long reporterSeq, Long memberSeq);

}
