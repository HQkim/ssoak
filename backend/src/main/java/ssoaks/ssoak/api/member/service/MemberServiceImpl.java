package ssoaks.ssoak.api.member.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ssoaks.ssoak.api.member.entity.Member;
import ssoaks.ssoak.api.member.repository.MemberRepository;
import ssoaks.ssoak.common.util.SecurityUtil;

import javax.transaction.Transactional;
import java.util.Optional;

@Slf4j
@Transactional
@Service
public class MemberServiceImpl implements MemberService{

    @Autowired
    private MemberRepository memberRepository;

    public Member getMemberByAuthentication() {
        long id = -1L;
        Optional<String> username = SecurityUtil.getCurrentUsername();
        if (username.isPresent()) {
            id = Long.parseLong(username.get());
        }
        return memberRepository.findById(id).orElse(null);
    }
}

