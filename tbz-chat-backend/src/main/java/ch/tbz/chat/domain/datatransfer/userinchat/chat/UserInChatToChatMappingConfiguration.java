package ch.tbz.chat.domain.datatransfer.userinchat.chat;

import ch.tbz.chat.domain.datatransfer.message.MessageMappingConfiguration;
import ch.tbz.chat.domain.datatransfer.userinchat.user.UserInChatToUserMappingConfiguration;
import lombok.Getter;

import java.util.function.UnaryOperator;

@Getter
public class UserInChatToChatMappingConfiguration {

    private boolean withUsers;
    private UserInChatToUserMappingConfiguration userConfiguration;
    private boolean withMessages;
    private MessageMappingConfiguration messageConfiguration;

    public UserInChatToChatMappingConfiguration withUsers(UserInChatToUserMappingConfiguration userConfiguration) {
        this.withUsers = true;
        this.userConfiguration = userConfiguration;
        return this;
    }

    public UserInChatToChatMappingConfiguration withUsers(UnaryOperator<UserInChatToUserMappingConfiguration> userConfiguration) {
        return withUsers(userConfiguration.apply(new UserInChatToUserMappingConfiguration()));
    }

    public UserInChatToChatMappingConfiguration withUsers() {
        return withUsers(new UserInChatToUserMappingConfiguration());
    }

    public UserInChatToChatMappingConfiguration withMessages(MessageMappingConfiguration messageConfiguration) {
        this.withMessages = true;
        this.messageConfiguration = messageConfiguration;
        return this;
    }

    public UserInChatToChatMappingConfiguration withMessages(UnaryOperator<MessageMappingConfiguration> messageConfiguration) {
        return withMessages(messageConfiguration.apply(new MessageMappingConfiguration()));
    }

    public UserInChatToChatMappingConfiguration withMessages() {
        return withMessages(new MessageMappingConfiguration());
    }

}
