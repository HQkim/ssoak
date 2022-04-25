package ssoaks.ssoak.api.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssoaks.ssoak.api.chat.entity.Chat;

public interface ChatRepository extends JpaRepository<Chat, Long> {


}
