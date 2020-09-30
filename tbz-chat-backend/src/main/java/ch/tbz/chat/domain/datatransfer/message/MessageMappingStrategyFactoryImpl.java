package ch.tbz.chat.domain.datatransfer.message;

import ch.tbz.chat.domain.datatransfer.MappingStrategy;
import ch.tbz.chat.domain.datatransfer.MappingStrategyFactoryAdapter;
import ch.tbz.chat.domain.model.Message;
import org.springframework.stereotype.Component;

@Component
public class MessageMappingStrategyFactoryImpl extends MappingStrategyFactoryAdapter<MessageDTO, Message, MessageMappingConfiguration> implements MessageMappingStrategyFactory {

    private final MappingStrategy<MessageDTO, Message> withChatIdStrategy;
    private final MappingStrategy<MessageDTO, Message> withAuthorIdStrategy;
    private final MappingStrategy<MessageDTO, Message> fullStrategy;

    public MessageMappingStrategyFactoryImpl(MessageMapper mapper) {
        super(MessageMappingConfiguration::new, mapper);
        this.withChatIdStrategy = new WithChatIdStrategy(mapper);
        this.withAuthorIdStrategy = new WithAuthorIdStrategy(mapper);
        this.fullStrategy = new FullStrategy(mapper);
    }

    @Override
    public MappingStrategy<MessageDTO, Message> getStrategy(MessageMappingConfiguration configuration) {
        if(configuration.isWithChatId() && configuration.isWithAuthorId()) {
            return fullStrategy;
        } else if (configuration.isWithChatId()) {
            return withChatIdStrategy;
        } else if (configuration.isWithAuthorId()) {
            return withAuthorIdStrategy;
        } else {
            return basicStrategy;
        }
    }
}
