package ch.tbz.chat.domain.repository;

import ch.tbz.chat.domain.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Optional;

@Repository
public interface UserRepository extends DomainEntityRepository<User> {

  boolean existsByEmail(String email);

  boolean existsByUsername(String username);

  Collection<User> findAllByEnabledTrue();

  Optional<User> findByEmailAndEnabledTrue(String email);

  Optional<User> findByIdAndEnabledTrue(String id);

  @Query(
      "from User u join UserInChat uic on uic.user.id = u.id where ((:excludedUserId is null and u.id is not null) or u.id <> :excludedUserId) and ((:excludeChatId is null and uic.chat.id is not null) or uic.chat.id <> :excludeChatId) and (lower(u.email) like concat('%', :query, '%') or lower(u.username) like concat('%', :query, '%')) and :query is not null")
  Collection<User> findAllByEmailOrUsername(
      String query, String excludeChatId, String excludedUserId);
}
