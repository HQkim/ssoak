package ssoaks.ssoak.config;


import ssoaks.ssoak.common.jwt.JwtAccessDeniedHandler;
import ssoaks.ssoak.common.jwt.JwtAuthenticationEntryPoint;
import ssoaks.ssoak.common.jwt.JwtAuthenticationProvider;
import ssoaks.ssoak.common.jwt.JwtSecurityConfig;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;



@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)  // method security 설정
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtAuthenticationProvider jwtAuthenticationProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    public SecurityConfig(
            JwtAuthenticationProvider jwtAuthenticationProvider,
            JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,
            JwtAccessDeniedHandler jwtAccessDeniedHandler
    ) {
        this.jwtAuthenticationProvider = jwtAuthenticationProvider;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable() // httpBasic disable
                .cors()

                .and()
                .headers()
                .frameOptions()
                .sameOrigin()

                .and()
                .csrf().disable()   // rest api이므로 csrf 보안이 필요X, token 사용 -> disable
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)  // jwt token 인증 -> session 생성 설정 해제(stateless)

                .and()
                .authorizeHttpRequests()    // HttpServletRequest에 따라 접근을 제한
//                .antMatchers("").hasRole("")  role에 따라 해당 url 접근을 허용
//                .mvcMatchers(HttpMethod.OPTIONS, "/**").permitAll() // Preflight Request 허용
//                .antMatchers("/api/v1/**").permitAll()  // >>>> 모든 url 접근을 허용
                .antMatchers("/api/v1/members", "/api/v1/members/login", "/api/v1/auctions/list","/api/v1/auctions/search",
                        "/api/v1/members/login/kakao", "/api/v1/members/login/apple", "/api/v1/members/callback/kakao", "/api/v1/members/callback/apple","/api/v1/ws", "/api/v1/ws/**").permitAll()  // 해당 url 접근을 모두 허용
                .anyRequest().authenticated()

                .and()
                .apply(new JwtSecurityConfig(jwtAuthenticationProvider))

                .and()
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler);

//                .and()
//                .oauth2Login()
//                .userInfoEndpoint()
//                .userService(customOAuth2UserService);
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

//        configuration.addAllowedOrigin("http://localhost:3000");
//        configuration.addAllowedOrigin("https://j6a207.p.ssafy.io");

        configuration.addAllowedOriginPattern("*"); // 모든 IP에 응답 허용
        configuration.addAllowedHeader("*"); // 모든 Header에 응답 허용
        configuration.addAllowedMethod("*"); // 모든 HTTP 요청 허용
        configuration.setAllowCredentials(true); // 서버 응답 시 json을 자바스크립트에서 처리하 수 있게 한다.

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
