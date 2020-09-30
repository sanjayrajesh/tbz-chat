package ch.tbz.chat.domain.datatransfer.userinchat.user;

import ch.tbz.chat.domain.datatransfer.MappingStrategy;
import ch.tbz.chat.domain.datatransfer.chat.ChatDTO;
import ch.tbz.chat.domain.datatransfer.user.UserDTO;
import ch.tbz.chat.domain.model.UserInChat;

public class WithChatsStrategy implements UserInChatToUserMappingStrategy {

    private final UserInChatToUserMapper mapper;
    private final MappingStrategy<ChatDTO, UserInChat> chatMappingStrategy;

    public WithChatsStrategy(UserInChatToUserMapper mapper, MappingStrategy<ChatDTO, UserInChat> chatMappingStrategy) {
        this.mapper = mapper;
        this.chatMappingStrategy = chatMappingStrategy;
    }

    @Override
    public UserDTO.WithChats map(UserInChat userInChat) {
        UserDTO.WithChats dto = mapper.withChatsDTO(userInChat);
        dto.setChats(chatMappingStrategy.map(userInChat.getChat().getUserInChats()));
        return dto;
    }
}
