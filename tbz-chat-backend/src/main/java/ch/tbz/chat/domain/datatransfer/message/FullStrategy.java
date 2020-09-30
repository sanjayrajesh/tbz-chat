package ch.tbz.chat.domain.datatransfer.message;

import ch.tbz.chat.domain.model.Message;

public class FullStrategy implements MessageMappingStrategy {

    private final MessageMapper mapper;

    public FullStrategy(MessageMapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public MessageDTO.Full map(Message message) {
        return mapper.fullDTO(message);
    }
}
