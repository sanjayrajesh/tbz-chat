package ch.tbz.chat.domain.service;

import ch.tbz.chat.domain.model.Chat;
import ch.tbz.chat.domain.model.User;
import ch.tbz.chat.domain.model.UserInChat;

import java.util.Collection;

public interface UserInChatService {

    /**
     * @param chatId the ID of the Chat
     * @param user the User to be checked
     * @return {@code true} if the user is a member of the Chat with given ID
     */
    boolean isMember(String chatId, User user);

    /**
     * @param chatId the ID of the Chat
     * @param user the User to be checked
     * @return {@code true} if the user is an administrator of the Chat with given ID
     */
    boolean isAdministrator(String chatId, User user);

    /**
     * Creates a new Chat and adds the creator to it as an administrator.
     * Also adds Users with given IDs to the chat as members.
     * @param chat the Chat to be created
     * @param userIds Collection of User IDs to be added to the chat as members
     * @param creator the creator of the Chat
     * @return the UserInChat object containing the created Chat as well as the creator
     */
    UserInChat createChat(Chat chat, Collection<String> userIds, User creator);

    Collection<UserInChat> addUsersToChat(String chatId, Collection<String> userIds);

    UserInChat grantAdministratorRole(String chatId, String userId);

    void removeUserFromChat(String chatId, String userId);

    void removeUserFromChat(String chatId, User user);

}
