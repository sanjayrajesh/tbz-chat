package ch.tbz.chat.domain.datatransfer.userinchat.user;

import ch.tbz.chat.domain.datatransfer.user.UserDTO;
import ch.tbz.chat.domain.model.UserInChat;

public class WithRoleStrategy implements UserInChatToUserMappingStrategy {

    private final UserInChatToUserMapper mapper;

    public WithRoleStrategy(UserInChatToUserMapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public UserDTO.WithRole map(UserInChat userInChat) {
        return mapper.withRoleDTO(userInChat);
    }
}
