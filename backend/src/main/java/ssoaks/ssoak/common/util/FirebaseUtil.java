package ssoaks.ssoak.common.util;


import com.google.firebase.database.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ssoaks.ssoak.common.dto.FirebaseChatroomDto;
import ssoaks.ssoak.common.dto.FirebaseFriendDto;
import ssoaks.ssoak.common.dto.FirebaseItemDto;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CountDownLatch;


@Slf4j
@Service
@RequiredArgsConstructor
public class FirebaseUtil {


    public FirebaseChatroomDto createChatroom(FirebaseItemDto itemDto) throws InterruptedException {
        log.debug("FirebaseUtil createChatroom - {}", itemDto );
        DatabaseReference ref = FirebaseDatabase.getInstance().getReference("chatrooms");

        FirebaseChatroomDto chatroomDto = FirebaseChatroomDto.builder().
                firstUser(itemDto.getSellerSeq()).secondUser(itemDto.getBuyerSeq()).build();

        Map<String, Object> chatrooms = new HashMap<>();
        chatrooms.put(itemDto.getItemSeq().toString(), chatroomDto);

        ref.updateChildrenAsync(chatrooms);

        updateFirebaseFriend(itemDto, "seller");
        updateFirebaseFriend(itemDto, "buyer");

        return chatroomDto;
    }

    public FirebaseChatroomDto updateFirebaseFriend(FirebaseItemDto itemDto, String person) throws InterruptedException {
        log.debug("FirebaseUtil updateFirebaseFriend dto- {} person- {} ", itemDto, person);
        String memberSeq = null;
        Long friendSeq = null;
        String imgUrl = null;
        if (person == "seller") {
            memberSeq = itemDto.getSellerSeq().toString();
            friendSeq = itemDto.getBuyerSeq();
            imgUrl = itemDto.getBuyerImgUrl();
        } else {
            memberSeq = itemDto.getBuyerSeq().toString();
            friendSeq = itemDto.getSellerSeq();
            imgUrl = itemDto.getSellerImgUrl();
        }

        DatabaseReference ref = FirebaseDatabase.getInstance().getReference(String.format("users/%s/friends", memberSeq));
        Long finalFriendSeq = friendSeq;
        String finalImgUrl = imgUrl;

        CountDownLatch latch = new CountDownLatch(1);
        String finalMemberSeq = memberSeq;
        ref.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                String index = String.valueOf(snapshot.getChildrenCount());

                FirebaseFriendDto friendDto = FirebaseFriendDto.builder().avatar(finalImgUrl)
                        .chatroomId(itemDto.getItemSeq()).userId(finalFriendSeq).title(itemDto.getTitle()).build();

                Map<String, Object> friends = new HashMap<>();
                friends.put(index, friendDto);

                ref.updateChildrenAsync(friends);
                latch.countDown();
            }

            @Override
            public void onCancelled(DatabaseError error) {
                System.out.println("The read failed: " + error.getCode());
                latch.countDown();
            }
        });
        // https://stackoverflow.com/questions/44548932/grab-data-from-firebase-with-java
        latch.await();
        return null;

    }

}
