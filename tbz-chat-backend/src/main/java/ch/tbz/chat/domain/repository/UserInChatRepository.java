package ch.tbz.chat.domain.repository;

import ch.tbz.chat.domain.model.Chat;
import ch.tbz.chat.domain.model.Role;
import ch.tbz.chat.domain.model.User;
import ch.tbz.chat.domain.model.UserInChat;
import org.springframework.stereotype.Repository;

@Repository
public interface UserInChatRepository extends DomainEntityRepository<UserInChat> {

    boolean existsByChatIdAndUserAndRole(String chatId, User user, Role role);

    UserInChat findByChatAndUser(Chat chat, User user);

}
