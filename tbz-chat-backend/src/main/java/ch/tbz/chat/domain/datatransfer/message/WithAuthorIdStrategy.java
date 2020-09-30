package ch.tbz.chat.domain.datatransfer.message;

import ch.tbz.chat.domain.model.Message;

public class WithAuthorIdStrategy implements MessageMappingStrategy {

    private final MessageMapper mapper;

    public WithAuthorIdStrategy(MessageMapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public MessageDTO.WithAuthorId map(Message message) {
        return mapper.withAuthorIdDTO(message);
    }
}
