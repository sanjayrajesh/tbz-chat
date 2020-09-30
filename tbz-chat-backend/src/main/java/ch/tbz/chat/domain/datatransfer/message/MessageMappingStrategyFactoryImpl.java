package ch.tbz.chat.domain.datatransfer.message;

import ch.tbz.chat.domain.datatransfer.MappingStrategy;
import ch.tbz.chat.domain.datatransfer.MappingStrategyFactoryAdapter;
import ch.tbz.chat.domain.model.Message;
import org.springframework.stereotype.Component;

@Component
public class MessageMappingStrategyFactoryImpl extends MappingStrategyFactoryAdapter<MessageDTO, Message, MessageMappingConfiguration> implements MessageMappingStrategyFactory {

    private final MappingStrategy<MessageDTO, Message> withChatIdStrategy;

    public MessageMappingStrategyFactoryImpl(MessageMapper mapper) {
        super(MessageMappingConfiguration::new, mapper);
        this.withChatIdStrategy = new WithChatIdStrategy(mapper);
    }

    @Override
    public MappingStrategy<MessageDTO, Message> getStrategy(MessageMappingConfiguration configuration) {
        if(configuration.isWithChatId()) {
            return withChatIdStrategy;
        } else {
            return basicStrategy;
        }
    }
}
