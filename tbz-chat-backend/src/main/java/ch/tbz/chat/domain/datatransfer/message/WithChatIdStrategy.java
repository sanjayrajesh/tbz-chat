package ch.tbz.chat.domain.datatransfer.message;

import ch.tbz.chat.domain.model.Message;

public class WithChatIdStrategy implements MessageMappingStrategy {

    private final MessageMapper messageMapper;

    public WithChatIdStrategy(MessageMapper messageMapper) {
        this.messageMapper = messageMapper;
    }

    @Override
    public MessageDTO.WithChatId map(Message message) {
        return messageMapper.withChatIdDTO(message);
    }
}
