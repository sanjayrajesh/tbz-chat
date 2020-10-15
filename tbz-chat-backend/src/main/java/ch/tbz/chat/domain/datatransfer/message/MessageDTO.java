package ch.tbz.chat.domain.datatransfer.message;

import ch.tbz.chat.domain.datatransfer.DTO;
import ch.tbz.chat.domain.datatransfer.user.UserDTO;
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
    public static class WithAuthor extends MessageDTO {
        protected UserDTO author;
    }

    @Getter @Setter
    public static class Full extends MessageDTO {
        protected String chatId;
        protected UserDTO author;
    }

}
