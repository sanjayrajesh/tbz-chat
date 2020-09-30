package ch.tbz.chat.domain.datatransfer.userinchat;

import ch.tbz.chat.domain.datatransfer.MappingStrategyFactory;
import ch.tbz.chat.domain.datatransfer.chat.ChatDTO;
import ch.tbz.chat.domain.datatransfer.user.UserDTO;
import ch.tbz.chat.domain.datatransfer.userinchat.chat.UserInChatToChatMappingStrategyFactoryImpl;
import ch.tbz.chat.domain.datatransfer.userinchat.user.UserInChatToUserMappingStrategyFactoryImpl;
import ch.tbz.chat.domain.model.UserInChat;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class UserInChatMappingStrategyFactoryBean {

    private final MappingStrategyFactory<UserDTO, UserInChat> userMappingStrategyFactory;
    private final MappingStrategyFactory<ChatDTO, UserInChat> chatMappingStrategyFactory;

    public UserInChatMappingStrategyFactoryBean(UserInChatToUserMappingStrategyFactoryImpl userMappingStrategyFactory, UserInChatToChatMappingStrategyFactoryImpl chatMappingStrategyFactory) {
        userMappingStrategyFactory.setChatMappingStrategyFactory(chatMappingStrategyFactory);
        chatMappingStrategyFactory.setUserMappingStrategyFactory(userMappingStrategyFactory);
        this.userMappingStrategyFactory = userMappingStrategyFactory;
        this.chatMappingStrategyFactory = chatMappingStrategyFactory;
    }

    @Bean
    @Primary
    public MappingStrategyFactory<UserDTO, UserInChat> userDTOUserInChatMappingStrategyFactory() {
        return userMappingStrategyFactory;
    }

    @Bean
    @Primary
    public MappingStrategyFactory<ChatDTO, UserInChat> chatDTOUserInChatMappingStrategyFactory() {
        return chatMappingStrategyFactory;
    }

}
