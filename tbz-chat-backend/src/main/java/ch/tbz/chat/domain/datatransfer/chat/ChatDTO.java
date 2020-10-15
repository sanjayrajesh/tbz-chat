package ch.tbz.chat.domain.datatransfer.chat;

import ch.tbz.chat.domain.datatransfer.DTO;
import ch.tbz.chat.domain.datatransfer.message.MessageDTO;
import ch.tbz.chat.domain.datatransfer.user.UserDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.Collection;
import java.util.HashSet;

@Getter @Setter
public class ChatDTO extends DTO {

    protected String name;
    protected String role;
    protected String createdAt;

    @Getter @Setter
    public static class Creation {
        protected String name;
        protected Collection<String> userIds = new HashSet<>();
    }

    @Getter @Setter
    public static class WithUsers extends ChatDTO {
        protected Collection<? extends UserDTO> users;
    }

    @Getter @Setter
    public static class WithMessages extends ChatDTO {
        protected Collection<? extends MessageDTO> messages;
    }

    @Getter @Setter
    public static class Full extends ChatDTO {
        protected Collection<? extends UserDTO> users;
        protected Collection<? extends MessageDTO> messages;
    }

}
