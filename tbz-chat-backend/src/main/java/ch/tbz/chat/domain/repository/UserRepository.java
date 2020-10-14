package ch.tbz.chat.domain.repository;

import ch.tbz.chat.domain.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

    @Query("FROM User WHERE (LOWER(email) LIKE concat('%', :query, '%') OR LOWER(username) LIKE concat('%', :query, '%')) AND :query IS NOT NULL")
    Collection<User> findAllByEmailOrUsername(@Param("query") String query);

}
