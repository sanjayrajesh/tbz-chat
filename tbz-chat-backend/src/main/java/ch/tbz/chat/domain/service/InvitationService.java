package ch.tbz.chat.domain.service;

import ch.tbz.chat.domain.model.User;
import ch.tbz.chat.domain.model.VerificationToken;

public interface InvitationService {

    void inviteUser(User user, VerificationToken token);

}
