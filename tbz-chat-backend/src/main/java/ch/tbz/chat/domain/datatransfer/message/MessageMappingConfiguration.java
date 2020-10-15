package ch.tbz.chat.domain.datatransfer.message;

import ch.tbz.chat.domain.datatransfer.user.UserMappingConfiguration;
import lombok.Getter;
import lombok.Setter;

import java.util.function.UnaryOperator;

@Getter @Setter
public class MessageMappingConfiguration {

    private boolean withChatId;
    private boolean withAuthor;
    private UserMappingConfiguration userConfiguration;

    public MessageMappingConfiguration withChatId() {
        this.withChatId = true;
        return this;
    }

    public MessageMappingConfiguration withAuthor(UserMappingConfiguration userConfiguration) {
        this.withAuthor = true;
        this.userConfiguration = userConfiguration;
        return this;
    }

    public MessageMappingConfiguration withAuthor(UnaryOperator<UserMappingConfiguration> userConfiguration) {
        return withAuthor(userConfiguration.apply(new UserMappingConfiguration()));
    }

    public MessageMappingConfiguration withAuthor() {
        return withAuthor(new UserMappingConfiguration());
    }

}
