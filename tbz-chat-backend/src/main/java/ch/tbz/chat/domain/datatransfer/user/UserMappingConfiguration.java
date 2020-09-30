package ch.tbz.chat.domain.datatransfer.user;

import ch.tbz.chat.domain.datatransfer.userinchat.chat.UserInChatToChatMappingConfiguration;
import lombok.Getter;

import java.util.function.UnaryOperator;

@Getter
public class UserMappingConfiguration {

    private boolean withChats;
    private UserInChatToChatMappingConfiguration chatConfiguration;

    public UserMappingConfiguration withChats(UserInChatToChatMappingConfiguration chatConfiguration) {
        this.withChats = true;
        this.chatConfiguration = chatConfiguration;
        return this;
    }

    public UserMappingConfiguration withChats(UnaryOperator<UserInChatToChatMappingConfiguration> chatConfiguration) {
        return withChats(chatConfiguration.apply(new UserInChatToChatMappingConfiguration()));
    }

    public UserMappingConfiguration withChats() {
        return withChats(new UserInChatToChatMappingConfiguration());
    }

}
