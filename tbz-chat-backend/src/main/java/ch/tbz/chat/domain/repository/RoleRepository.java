package ch.tbz.chat.domain.repository;

import ch.tbz.chat.domain.model.Role;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends DomainEntityRepository<Role> {

    Optional<Role> findByName(String name);

}
