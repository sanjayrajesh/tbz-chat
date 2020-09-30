package ch.tbz.chat.domain.datatransfer.user;

import ch.tbz.chat.domain.datatransfer.MappingStrategy;
import ch.tbz.chat.domain.datatransfer.MappingStrategyFactoryAdapter;
import ch.tbz.chat.domain.datatransfer.userinchat.chat.UserInChatToChatMappingStrategyFactory;
import ch.tbz.chat.domain.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMappingStrategyFactoryImpl extends MappingStrategyFactoryAdapter<UserDTO, User, UserMappingConfiguration> implements UserMappingStrategyFactory {

    private final UserMapper mapper;
    private final UserInChatToChatMappingStrategyFactory chatMappingStrategyFactory;

    public UserMappingStrategyFactoryImpl(UserMapper mapper, UserInChatToChatMappingStrategyFactory chatMappingStrategyFactory) {
        super(UserMappingConfiguration::new, mapper);
        this.mapper = mapper;
        this.chatMappingStrategyFactory = chatMappingStrategyFactory;
    }

    @Override
    public MappingStrategy<UserDTO, User> getStrategy(UserMappingConfiguration configuration) {
        if (configuration.isWithChats()) {
            return new WithChatsStrategy(mapper, chatMappingStrategyFactory.getStrategy(configuration.getChatConfiguration()));
        } else {
            return basicStrategy;
        }
    }
}
