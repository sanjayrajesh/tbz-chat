package ch.tbz.chat.domain.repository;

import ch.tbz.chat.domain.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Optional;

@Repository
public interface UserRepository extends DomainEntityRepository<User> {

  @Query("select (case when count(id) > 0 then true else false end) from User where ((:excludedUserId is null and id is not null) or id <> :excludedUserId) and email = :email and :email is not null")
  boolean existsByEmail(String email, String excludedUserId);

  Collection<User> findAllByEnabledTrue();

  Optional<User> findByEmailAndEnabledTrue(String email);

  Optional<User> findByIdAndEnabledTrue(String id);

  @Query(
      "from User u left join UserInChat uic on uic.user.id = u.id where ((:excludedUserId is null and u.id is not null) or u.id <> :excludedUserId) and ((:excludeChatId is null and uic.chat.id is not null) or (uic.chat.id <> :excludeChatId or uic.chat.id is null)) and (lower(u.email) like concat('%', :query, '%') or lower(u.username) like concat('%', :query, '%')) and :query is not null")
  Collection<User> findAllByEmailOrUsername(
      String query, String excludeChatId, String excludedUserId);
}
