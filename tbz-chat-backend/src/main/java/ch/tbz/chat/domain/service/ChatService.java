package ch.tbz.chat.domain.service;

import ch.tbz.chat.domain.model.Chat;
import ch.tbz.chat.domain.model.User;

public interface ChatService {

    Chat create(Chat chat, User authenticated);

}
