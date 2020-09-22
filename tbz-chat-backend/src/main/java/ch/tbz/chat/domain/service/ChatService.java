package ch.tbz.chat.domain.service;

import ch.tbz.chat.domain.model.Chat;
import ch.tbz.chat.domain.model.User;

import java.util.Collection;

public interface ChatService {

    Chat create(Chat chat, User authenticated);

}
