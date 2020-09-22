package ch.tbz.chat.domain.service.impl;

import ch.tbz.chat.domain.model.User;
import ch.tbz.chat.domain.model.VerificationToken;
import ch.tbz.chat.domain.service.InvitationService;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InvitationServiceImpl implements InvitationService {

    private final Logger logger;

    @Autowired
    public InvitationServiceImpl(Logger logger) {
        this.logger = logger;
    }

    @Override
    public void inviteUser(User user, VerificationToken token) {
        logger.debug("Sent invitation mail to '{}' with verification token '{}'", user.getEmail(), token.getToken());
    }
}
