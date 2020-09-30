package ch.tbz.chat.domain.datatransfer.userinchat.chat;

import ch.tbz.chat.domain.datatransfer.MappingStrategy;
import ch.tbz.chat.domain.datatransfer.chat.ChatDTO;
import ch.tbz.chat.domain.datatransfer.message.MessageDTO;
import ch.tbz.chat.domain.model.Message;
import ch.tbz.chat.domain.model.UserInChat;

public class WithMessagesStrategy implements UserInChatToChatMappingStrategy {

    private final UserInChatToChatMapper mapper;
    private final MappingStrategy<MessageDTO, Message> messageMappingStrategy;

    WithMessagesStrategy(UserInChatToChatMapper mapper, MappingStrategy<MessageDTO, Message> messageMappingStrategy) {
        this.mapper = mapper;
        this.messageMappingStrategy = messageMappingStrategy;
    }

    @Override
    public ChatDTO.WithMessages map(UserInChat userInChat) {
        ChatDTO.WithMessages dto = mapper.withMessagesDTO(userInChat);
        dto.setMessages(messageMappingStrategy.map(userInChat.getChat().getMessages()));
        return dto;
    }
}
