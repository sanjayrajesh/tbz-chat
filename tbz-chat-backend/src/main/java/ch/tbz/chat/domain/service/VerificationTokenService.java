package ch.tbz.chat.domain.service;

import ch.tbz.chat.domain.model.User;
import ch.tbz.chat.domain.model.VerificationToken;

import java.util.NoSuchElementException;

public interface VerificationTokenService {

    VerificationToken create(User user);

    void delete(VerificationToken token);

    VerificationToken findByToken(String token) throws NoSuchElementException;

}
