package ch.tbz.chat.domain.service;

import ch.tbz.chat.domain.model.User;

import java.util.Collection;

public interface UserInChatService {

    CollectionOperationResult<User> addUsersToChat(String chatId, Collection<String> userIds, User authenticated);

    void leaveChat(String chatId, User authenticated);

}
