package ch.tbz.chat.domain.repository;

import ch.tbz.chat.domain.model.Chat;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRepository extends DomainEntityRepository<Chat> {
}
