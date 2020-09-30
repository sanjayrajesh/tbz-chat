package ch.tbz.chat.domain.service.impl;

import ch.tbz.chat.domain.model.Chat;
import ch.tbz.chat.domain.model.User;
import ch.tbz.chat.domain.model.UserInChat;
import ch.tbz.chat.domain.repository.UserInChatRepository;
import ch.tbz.chat.domain.service.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service("userInChatService")
public class UserInChatServiceImpl extends CrudServiceImpl<UserInChat, UserInChatRepository> implements UserInChatService {

    private final UserService userService;
    private final ChatService chatService;
    private final RoleService roleService;

    public UserInChatServiceImpl(UserInChatRepository repository, UserService userService, ChatService chatService, RoleService roleService) {
        super(repository);
        this.userService = userService;
        this.chatService = chatService;
        this.roleService = roleService;
    }

    /**
     * @param chatId the ID of the Chat
     * @param user   the User to be checked
     * @return {@code true} if the user is a member of the Chat with given ID
     */
    @Override
    public boolean isMember(String chatId, User user) {
        return repository.existsByChatIdAndUserAndRole(chatId, user, roleService.getMemberRole());
    }

    /**
     * @param chatId the ID of the Chat
     * @param user   the User to be checked
     * @return {@code true} if the user is an administrator of the Chat with given ID
     */
    @Override
    public boolean isAdministrator(String chatId, User user) {
        return repository.existsByChatIdAndUserAndRole(chatId, user, roleService.getAdministratorRole());
    }

    /**
     * Creates a new Chat and adds the creator to it as an administrator.
     * Also adds Users with given IDs to the chat as members.
     *
     * @param chat    the Chat to be created
     * @param userIds Collection of User IDs to be added to the chat as members
     * @param creator the creator of the Chat
     * @return the UserInChat object containing the created Chat as well as the creator
     */
    @Override
    public UserInChat createChat(Chat chat, Collection<String> userIds, User creator) {
        chat = chatService.create(chat);

        UserInChat result = create(new UserInChat(creator, chat, roleService.getAdministratorRole()));

        List<UserInChat> userInChats = new ArrayList<>(userIds.size());

        Chat finalChat = chat;
        Collection<UserInChat> finalUserInChats = userInChats;
        userIds.stream().map(userService::findById).forEach(user -> {
            finalUserInChats.add(new UserInChat(user, finalChat, roleService.getMemberRole()));
        });

        userInChats = repository.saveAll(userInChats);
        userInChats.add(result);

        chat.setUserInChats(userInChats);
        chatService.save(chat);

        return result;
    }

    @Override
    public Collection<UserInChat> addUsersToChat(String chatId, Collection<String> userIds) {
        Chat chat = chatService.findById(chatId);

        List<UserInChat> userInChats = new ArrayList<>(userIds.size());

        userIds.stream().map(userService::findById).forEach(user -> {
            userInChats.add(new UserInChat(user, chat, roleService.getMemberRole()));
        });

        chat.setUserInChats(repository.saveAll(userInChats));
        chatService.save(chat);

        return chat.getUserInChats();
    }

    @Override
    public UserInChat grantAdministratorRole(String chatId, String userId) {
        UserInChat userInChat = repository.findByChatAndUser(chatService.findById(chatId), userService.findById(userId));

        userInChat.setRole(roleService.getAdministratorRole());

        return save(userInChat);
    }

    @Override
    public void removeUserFromChat(String chatId, String userId) {
        removeUserFromChat(chatService.findById(chatId), userService.findById(userId));
    }

    @Override
    public void removeUserFromChat(String chatId, User user) {
        removeUserFromChat(chatService.findById(chatId), user);
    }

    private void removeUserFromChat(Chat chat, User user) {
        UserInChat userInChat = repository.findByChatAndUser(chat, user);

        repository.delete(userInChat);
    }
}
