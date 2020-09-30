package ch.tbz.chat.domain.datatransfer.user;

import ch.tbz.chat.domain.datatransfer.DTO;
import ch.tbz.chat.domain.datatransfer.chat.ChatDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.Collection;

@Getter @Setter
public class UserDTO extends DTO {

    protected String email;
    protected String username;

    @Getter @Setter
    public static class Registration extends DTO {
        protected String email;
    }

    @Getter @Setter
    public static class WithPassword extends UserDTO {
        protected String password;
    }

    @Getter @Setter
    public static class WithRole extends UserDTO {
        protected String role;
    }

    @Getter @Setter
    public static class WithChats extends UserDTO {
        protected Collection<? extends ChatDTO> chats;
    }

}
