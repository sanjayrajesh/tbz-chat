package ch.tbz.chat.domain.datatransfer.message;

import ch.tbz.chat.domain.datatransfer.DTO;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class MessageDTO extends DTO {

    protected String body;
    protected String timestamp = LocalDateTime.now().toString();

    @Getter @Setter
    public static class WithChatId extends MessageDTO {
        protected String chatId;
    }

    @Getter @Setter
    public static class WithAuthorId extends MessageDTO {
        protected String authorId;
    }

    @Getter @Setter
    public static class Full extends MessageDTO {
        protected String chatId;
        protected String authorId;
    }

}
