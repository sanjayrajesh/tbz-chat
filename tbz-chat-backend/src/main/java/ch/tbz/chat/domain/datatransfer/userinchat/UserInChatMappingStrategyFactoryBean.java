package ch.tbz.chat.domain.datatransfer.userinchat;

import ch.tbz.chat.domain.datatransfer.MappingStrategyFactory;
import ch.tbz.chat.domain.datatransfer.chat.ChatDTO;
import ch.tbz.chat.domain.datatransfer.message.MessageMappingStrategyFactory;
import ch.tbz.chat.domain.datatransfer.user.UserDTO;
import ch.tbz.chat.domain.datatransfer.userinchat.chat.UserInChatToChatMapper;
import ch.tbz.chat.domain.datatransfer.userinchat.chat.UserInChatToChatMappingStrategyFactory;
import ch.tbz.chat.domain.datatransfer.userinchat.chat.UserInChatToChatMappingStrategyFactoryImpl;
import ch.tbz.chat.domain.datatransfer.userinchat.user.UserInChatToUserMapper;
import ch.tbz.chat.domain.datatransfer.userinchat.user.UserInChatToUserMappingStrategyFactory;
import ch.tbz.chat.domain.datatransfer.userinchat.user.UserInChatToUserMappingStrategyFactoryImpl;
import ch.tbz.chat.domain.model.UserInChat;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class UserInChatMappingStrategyFactoryBean {

    private final UserInChatToUserMappingStrategyFactoryImpl userMappingStrategyFactory;
    private final UserInChatToChatMappingStrategyFactoryImpl chatMappingStrategyFactory;

    public UserInChatMappingStrategyFactoryBean(UserInChatToUserMapper userInChatToUserMapper, UserInChatToChatMapper userInChatToChatMapper, MessageMappingStrategyFactory messageMappingStrategyFactory) {
        userMappingStrategyFactory = new UserInChatToUserMappingStrategyFactoryImpl(userInChatToUserMapper);
        chatMappingStrategyFactory = new UserInChatToChatMappingStrategyFactoryImpl(userInChatToChatMapper, messageMappingStrategyFactory);

        userMappingStrategyFactory.setChatMappingStrategyFactory(chatMappingStrategyFactory);
        chatMappingStrategyFactory.setUserMappingStrategyFactory(userMappingStrategyFactory);
    }

    @Bean
    @Primary
    public UserInChatToUserMappingStrategyFactory userDTOUserInChatMappingStrategyFactory() {
        return userMappingStrategyFactory;
    }

    @Bean
    @Primary
    public UserInChatToChatMappingStrategyFactory chatDTOUserInChatMappingStrategyFactory() {
        return chatMappingStrategyFactory;
    }

}
