package ch.tbz.chat.domain.datatransfer.userinchat.chat;

import ch.tbz.chat.domain.datatransfer.MappingStrategy;
import ch.tbz.chat.domain.datatransfer.chat.ChatDTO;
import ch.tbz.chat.domain.datatransfer.user.UserDTO;
import ch.tbz.chat.domain.model.UserInChat;

public class WithUsersStrategy implements UserInChatToChatMappingStrategy {

    private final UserInChatToChatMapper mapper;
    private final MappingStrategy<UserDTO, UserInChat> userMappingStrategy;

    WithUsersStrategy(UserInChatToChatMapper mapper, MappingStrategy<UserDTO, UserInChat> userMappingStrategy) {
        this.mapper = mapper;
        this.userMappingStrategy = userMappingStrategy;
    }

    @Override
    public ChatDTO.WithUsers map(UserInChat userInChat) {
        ChatDTO.WithUsers dto = mapper.withUsersDTO(userInChat);
        dto.setUsers(userMappingStrategy.map(userInChat.getUser().getUserInChats()));
        return dto;
    }
}
