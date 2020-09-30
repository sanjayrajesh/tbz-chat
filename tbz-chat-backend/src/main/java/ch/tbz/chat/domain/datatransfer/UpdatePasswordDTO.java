package ch.tbz.chat.domain.datatransfer;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UpdatePasswordDTO {

    private String oldPassword;
    private String newPassword;

}
