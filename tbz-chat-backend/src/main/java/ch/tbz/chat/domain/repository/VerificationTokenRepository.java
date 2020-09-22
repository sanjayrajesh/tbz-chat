package ch.tbz.chat.domain.repository;

import ch.tbz.chat.domain.model.VerificationToken;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VerificationTokenRepository extends DomainEntityRepository<VerificationToken> {

    Optional<VerificationToken> findByToken(String token);

}
