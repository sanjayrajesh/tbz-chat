package ch.tbz.chat.domain.datatransfer.message;

import ch.tbz.chat.domain.datatransfer.MappingStrategy;
import ch.tbz.chat.domain.datatransfer.MappingStrategyFactoryAdapter;
import ch.tbz.chat.domain.datatransfer.user.UserMappingStrategyFactory;
import ch.tbz.chat.domain.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MessageMappingStrategyFactoryImpl
    extends MappingStrategyFactoryAdapter<MessageDTO, Message, MessageMappingConfiguration>
    implements MessageMappingStrategyFactory {

  private final MessageMapper mapper;
  private final MappingStrategy<MessageDTO, Message> withChatIdStrategy;
  private UserMappingStrategyFactory userMappingStrategyFactory;

  public MessageMappingStrategyFactoryImpl(MessageMapper mapper) {
    super(MessageMappingConfiguration::new, mapper);
    this.mapper = mapper;
    this.withChatIdStrategy = new WithChatIdStrategy(mapper);
  }

  @Override
  public MappingStrategy<MessageDTO, Message> getStrategy(
      MessageMappingConfiguration configuration) {
    if (configuration.isWithChatId() && configuration.isWithAuthor()) {
      return new FullStrategy(
          mapper, userMappingStrategyFactory.getStrategy(configuration.getUserConfiguration()));
    } else if (configuration.isWithChatId()) {
      return withChatIdStrategy;
    } else if (configuration.isWithAuthor()) {
      return new WithAuthorStrategy(
          mapper, userMappingStrategyFactory.getStrategy(configuration.getUserConfiguration()));
    } else {
      return basicStrategy;
    }
  }

  @Autowired
  public void setUserMappingStrategyFactory(
      UserMappingStrategyFactory userMappingStrategyFactory) {
    this.userMappingStrategyFactory = userMappingStrategyFactory;
  }
}
