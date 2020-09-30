package ch.tbz.chat.domain.datatransfer.message;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MessageMappingConfiguration {

    private boolean withChatId;
    private boolean withAuthorId;

    public MessageMappingConfiguration withChatId() {
        this.withChatId = true;
        return this;
    }

    public MessageMappingConfiguration withAuthorId() {
        this.withAuthorId = true;
        return this;
    }

}
