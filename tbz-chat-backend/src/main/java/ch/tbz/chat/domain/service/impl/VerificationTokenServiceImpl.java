package ch.tbz.chat.domain.service.impl;

import ch.tbz.chat.domain.model.User;
import ch.tbz.chat.domain.model.VerificationToken;
import ch.tbz.chat.domain.repository.VerificationTokenRepository;
import ch.tbz.chat.domain.service.VerificationTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

@Service
public class VerificationTokenServiceImpl implements VerificationTokenService {

    private final VerificationTokenRepository repository;

    @Autowired
    public VerificationTokenServiceImpl(VerificationTokenRepository repository) {
        this.repository = repository;
    }

    @Override
    public VerificationToken findByToken(String token) throws NoSuchElementException {
        Optional<VerificationToken> optional = repository.findByToken(token);

        if (optional.isPresent()) {
            return optional.get();
        } else {
            throw new NoSuchElementException(token);
        }
    }

    @Override
    public void delete(VerificationToken token) {
        repository.delete(token);
    }

    @Override
    public VerificationToken create(User user) {
        return repository.save(
                new VerificationToken()
                        .setToken(generateToken())
                        .setUser(user)
        );
    }

    private String generateToken() {
        return UUID.randomUUID().toString();
    }
}
