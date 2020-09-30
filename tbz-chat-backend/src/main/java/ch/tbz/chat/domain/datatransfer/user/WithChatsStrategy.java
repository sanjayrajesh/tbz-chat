package ch.tbz.chat.domain.datatransfer.user;

import ch.tbz.chat.domain.datatransfer.MappingStrategy;
import ch.tbz.chat.domain.datatransfer.chat.ChatDTO;
import ch.tbz.chat.domain.model.User;
import ch.tbz.chat.domain.model.UserInChat;

public class WithChatsStrategy implements UserMappingStrategy {

    private final UserMapper mapper;
    private final MappingStrategy<ChatDTO, UserInChat> chatMappingStrategy;

    public WithChatsStrategy(UserMapper mapper, MappingStrategy<ChatDTO, UserInChat> chatMappingStrategy) {
        this.mapper = mapper;
        this.chatMappingStrategy = chatMappingStrategy;
    }

    @Override
    public UserDTO.WithChats map(User user) {
        UserDTO.WithChats dto = mapper.withChatsDTO(user);
        dto.setChats(chatMappingStrategy.map(user.getUserInChats()));
        return dto;
    }
}
