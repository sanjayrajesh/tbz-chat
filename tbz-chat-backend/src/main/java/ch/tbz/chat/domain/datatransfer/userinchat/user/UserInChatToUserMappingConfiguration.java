package ch.tbz.chat.domain.datatransfer.userinchat.user;

import ch.tbz.chat.domain.datatransfer.userinchat.chat.UserInChatToChatMappingConfiguration;
import lombok.Getter;

import java.util.function.UnaryOperator;

@Getter
public class UserInChatToUserMappingConfiguration {

    private boolean withChats;
    private UserInChatToChatMappingConfiguration chatConfiguration;
    private boolean withRole;

    public UserInChatToUserMappingConfiguration withChats(UserInChatToChatMappingConfiguration chatConfiguration) {
        this.withChats = true;
        this.chatConfiguration = chatConfiguration;
        return this;
    }

    public UserInChatToUserMappingConfiguration withChats(UnaryOperator<UserInChatToChatMappingConfiguration> chatConfiguration) {
        return withChats(chatConfiguration.apply(new UserInChatToChatMappingConfiguration()));
    }

    public UserInChatToUserMappingConfiguration withChats() {
        return withChats(new UserInChatToChatMappingConfiguration());
    }

    public UserInChatToUserMappingConfiguration withRole() {
        this.withRole = true;
        return this;
    }

}
