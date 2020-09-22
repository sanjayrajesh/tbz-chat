package ch.tbz.chat.domain.repository;

import ch.tbz.chat.domain.model.DomainEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface DomainEntityRepository<T extends DomainEntity> extends JpaRepository<T, String> {

}
