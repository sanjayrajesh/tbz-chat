package ch.tbz.chat.domain.datatransfer.userinchat.chat;

import ch.tbz.chat.domain.datatransfer.MappingStrategy;
import ch.tbz.chat.domain.datatransfer.MappingStrategyFactoryAdapter;
import ch.tbz.chat.domain.datatransfer.chat.ChatDTO;
import ch.tbz.chat.domain.datatransfer.message.MessageMappingStrategyFactory;
import ch.tbz.chat.domain.datatransfer.userinchat.user.UserInChatToUserMappingStrategyFactory;
import ch.tbz.chat.domain.model.UserInChat;

public class UserInChatToChatMappingStrategyFactoryImpl extends MappingStrategyFactoryAdapter<ChatDTO, UserInChat, UserInChatToChatMappingConfiguration> implements UserInChatToChatMappingStrategyFactory {

    private final UserInChatToChatMapper mapper;
    private final MessageMappingStrategyFactory messageMappingStrategyFactory;
    private UserInChatToUserMappingStrategyFactory userMappingStrategyFactory;

    public UserInChatToChatMappingStrategyFactoryImpl(UserInChatToChatMapper mapper, MessageMappingStrategyFactory messageMappingStrategyFactory) {
        super(UserInChatToChatMappingConfiguration::new, mapper);
        this.mapper = mapper;
        this.messageMappingStrategyFactory = messageMappingStrategyFactory;
    }

    public void setUserMappingStrategyFactory(UserInChatToUserMappingStrategyFactory userMappingStrategyFactory) {
        this.userMappingStrategyFactory = userMappingStrategyFactory;
    }

    @Override
    public MappingStrategy<ChatDTO, UserInChat> getStrategy(UserInChatToChatMappingConfiguration configuration) {
        if(configuration.isWithUsers() && configuration.isWithMessages()) {
            return new FullStrategy(mapper, userMappingStrategyFactory.getStrategy(configuration.getUserConfiguration()), messageMappingStrategyFactory.getStrategy(configuration.getMessageConfiguration()));
        } else if (configuration.isWithUsers()) {
            return new WithUsersStrategy(mapper, userMappingStrategyFactory.getStrategy(configuration.getUserConfiguration()));
        } else if (configuration.isWithMessages()) {
            return new WithMessagesStrategy(mapper, messageMappingStrategyFactory.getStrategy(configuration.getMessageConfiguration()));
        } else {
            return basicStrategy;
        }
    }
}
