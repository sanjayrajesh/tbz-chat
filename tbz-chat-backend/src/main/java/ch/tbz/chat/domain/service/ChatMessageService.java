package ch.tbz.chat.domain.service;

import ch.tbz.chat.domain.model.Message;
import ch.tbz.chat.domain.model.User;

public interface ChatMessageService {

    Message addMessageToChat(String chatId, Message message, User author);

}
