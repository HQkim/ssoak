package ssoaks.ssoak.api.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssoaks.ssoak.api.member.entity.Member;
import ssoaks.ssoak.api.member.repository.MemberRepository;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {
        log.debug("loadUserByUsername - username: {}", username);
        Member member = memberRepository.findById(Long.parseLong(username))
                .orElseThrow(() -> new UsernameNotFoundException(username + " -> 데이터베이스에서 찾을 수 없습니다."));

        UserDetails user = User.builder()
                .username(username)
                .password(member.getPassword())
                .roles("MEMBER")    // 제공되는 UserDetails를 쓰기 때문에 role을 꼭 설정해줘야함!
                .build();

        return user;

    }

}
