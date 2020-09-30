package ch.tbz.chat.domain.datatransfer.userinchat.user;

import ch.tbz.chat.domain.datatransfer.MappingStrategy;
import ch.tbz.chat.domain.datatransfer.user.UserDTO;
import ch.tbz.chat.domain.model.UserInChat;

public interface UserInChatToUserMappingStrategy extends MappingStrategy<UserDTO, UserInChat> {
}
