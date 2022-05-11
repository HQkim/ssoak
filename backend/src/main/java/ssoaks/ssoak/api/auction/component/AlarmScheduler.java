package ssoaks.ssoak.api.auction.component;


import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class AlarmScheduler {
    @Scheduled(cron = "10 * * * * *")
    public void run() {
        log.info("=========스프링 부트 스케줄러=========");
    }


}
