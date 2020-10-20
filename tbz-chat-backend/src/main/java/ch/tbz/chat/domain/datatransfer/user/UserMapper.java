package ch.tbz.chat.domain.datatransfer.user;

import ch.tbz.chat.domain.datatransfer.DTOMapper;
import ch.tbz.chat.domain.model.User;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

import java.util.Collection;

@Mapper
public interface UserMapper extends DTOMapper<UserDTO, User> {

    @Override
    @Named("dto")
    UserDTO dto(User user);

    @Override
    @IterableMapping(qualifiedByName = "dto")
    Collection<UserDTO> dto(Collection<User> users);

    User user(UserDTO userDTO);

    User user(UserDTO.WithPassword userDTO);

    User user(UserDTO.Registration userDTO);

    UserDTO.WithChats withChatsDTO(User user);

}
