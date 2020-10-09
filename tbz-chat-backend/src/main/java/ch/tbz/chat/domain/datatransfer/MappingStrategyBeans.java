package ch.tbz.chat.domain.datatransfer;

import ch.tbz.chat.domain.datatransfer.chat.ChatDTO;
import ch.tbz.chat.domain.datatransfer.message.MessageDTO;
import ch.tbz.chat.domain.datatransfer.message.MessageMappingStrategyFactory;
import ch.tbz.chat.domain.datatransfer.user.UserDTO;
import ch.tbz.chat.domain.datatransfer.user.UserMappingStrategyFactory;
import ch.tbz.chat.domain.datatransfer.userinchat.chat.UserInChatToChatMappingStrategyFactory;
import ch.tbz.chat.domain.datatransfer.userinchat.user.UserInChatToUserMappingStrategyFactory;
import ch.tbz.chat.domain.model.Message;
import ch.tbz.chat.domain.model.User;
import ch.tbz.chat.domain.model.UserInChat;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MappingStrategyBeans {

    @Bean
    public MappingStrategy<ChatDTO, UserInChat> chatMappingStrategy(UserInChatToChatMappingStrategyFactory chatMappingStrategyFactory) {
        return chatMappingStrategyFactory.getStrategy(
                conf -> conf.withMessages(
                        messageConf -> messageConf.withAuthorId()
                ).withUsers(
                        userConf -> userConf.withRole()
                )
        );
    }

    @Bean
    public MappingStrategy<UserDTO, User> userMappingStrategy(UserMappingStrategyFactory userMappingStrategyFactory) {
        return userMappingStrategyFactory.getStrategy(
                conf -> conf.withChats(
                        chatConf -> chatConf.withMessages(
                                messageConf -> messageConf.withAuthorId()
                        ).withUsers(
                                userConf -> userConf.withRole()
                        )
                )
        );
    }

    @Bean
    public MappingStrategy<UserDTO, UserInChat> userDTOUserInChatMappingStrategy(UserInChatToUserMappingStrategyFactory userMappingStrategyFactory) {
        return userMappingStrategyFactory.getStrategy(
                conf -> conf.withRole()
        );
    }

    @Bean
    public MappingStrategy<MessageDTO, Message> messageMappingStrategy(MessageMappingStrategyFactory messageMappingStrategyFactory) {
        return messageMappingStrategyFactory.getStrategy(
                conf -> conf.withChatId().withAuthorId()
        );
    }

}
