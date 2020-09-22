package ch.tbz.chat.domain.repository;

import ch.tbz.chat.domain.model.Message;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends DomainEntityRepository<Message> {
}
