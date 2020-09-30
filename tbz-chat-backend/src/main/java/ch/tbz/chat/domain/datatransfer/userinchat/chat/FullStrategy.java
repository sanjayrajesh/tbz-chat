package ch.tbz.chat.domain.datatransfer.userinchat.chat;

import ch.tbz.chat.domain.datatransfer.MappingStrategy;
import ch.tbz.chat.domain.datatransfer.chat.ChatDTO;
import ch.tbz.chat.domain.datatransfer.message.MessageDTO;
import ch.tbz.chat.domain.datatransfer.user.UserDTO;
import ch.tbz.chat.domain.model.Message;
import ch.tbz.chat.domain.model.UserInChat;

public class FullStrategy implements UserInChatToChatMappingStrategy {

    private final UserInChatToChatMapper mapper;
    private final MappingStrategy<UserDTO, UserInChat> userMappingStrategy;
    private final MappingStrategy<MessageDTO, Message> messageMappingStrategy;

    public FullStrategy(UserInChatToChatMapper mapper, MappingStrategy<UserDTO, UserInChat> userMappingStrategy, MappingStrategy<MessageDTO, Message> messageMappingStrategy) {
        this.mapper = mapper;
        this.userMappingStrategy = userMappingStrategy;
        this.messageMappingStrategy = messageMappingStrategy;
    }

    @Override
    public ChatDTO.Full map(UserInChat userInChat) {
        ChatDTO.Full dto = mapper.fullDTO(userInChat);
        dto.setMessages(messageMappingStrategy.map(userInChat.getChat().getMessages()));
        dto.setUsers(userMappingStrategy.map(userInChat.getChat().getUserInChats()));
        return dto;
    }
}
