package ch.tbz.chat.domain.datatransfer.userinchat.user;

import ch.tbz.chat.domain.datatransfer.DTOMapper;
import ch.tbz.chat.domain.datatransfer.user.UserDTO;
import ch.tbz.chat.domain.model.UserInChat;
import org.mapstruct.*;

import java.util.Collection;

@Mapper
public interface UserInChatToUserMapper extends DTOMapper<UserDTO, UserInChat> {

    @Override
    @Named("dto")
    @Mapping(target = "id", source = "user.id")
    @Mapping(target = ".", source = "user")
    UserDTO dto(UserInChat userInChat);

    @Override
    @IterableMapping(qualifiedByName = "dto")
    Collection<UserDTO> dto(Collection<UserInChat> userInChats);

    @InheritConfiguration(name = "dto")
    UserDTO.WithChats withChatsDTO(UserInChat userInChat);

    @InheritConfiguration(name = "dto")
    @Mapping(target = "role", source = "role.name")
    UserDTO.WithRole withRoleDTO(UserInChat userInChat);
}
