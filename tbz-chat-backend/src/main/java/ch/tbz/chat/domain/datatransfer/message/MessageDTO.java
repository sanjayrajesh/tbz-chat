package ch.tbz.chat.domain.datatransfer.message;

import ch.tbz.chat.domain.datatransfer.DTO;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MessageDTO extends DTO {

    protected String body;
    protected String timestamp;

    @Getter @Setter
    public static class WithChatId extends MessageDTO {
        protected String chatId;
    }

}
