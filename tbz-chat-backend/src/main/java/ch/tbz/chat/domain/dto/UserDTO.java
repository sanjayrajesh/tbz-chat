package ch.tbz.chat.domain.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserDTO extends DTO {

    protected String email;
    protected String username;

    @Getter @Setter
    public static class WithPassword extends UserDTO {
        protected String password;
    }

}
