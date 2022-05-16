package ssoaks.ssoak.common.util;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import ssoaks.ssoak.common.dto.FirebaseItemDto;



@RestController
public class FirebaseController {

    private final FirebaseUtil firebaseUtil;

    public FirebaseController(FirebaseUtil firebaseUtil) {
        this.firebaseUtil = firebaseUtil;
    }

    @PostMapping("/api/v1/chat/create")
    public String createChatroom() throws InterruptedException {

        System.out.println("createChatroom API 실행========");

        firebaseUtil.createChatroom(new FirebaseItemDto(5L,2L,1L,"title","sellerImg", "buyerImg"));
        System.out.println("createChatroom API 종료=======");
        return null;
    }
}
