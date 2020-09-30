package ch.tbz.chat.domain.datatransfer.userinchat.chat;

import ch.tbz.chat.domain.datatransfer.DTOMapper;
import ch.tbz.chat.domain.datatransfer.chat.ChatDTO;
import ch.tbz.chat.domain.model.UserInChat;
import org.mapstruct.*;

import java.util.Collection;

@Mapper
public interface UserInChatToChatMapper extends DTOMapper<ChatDTO, UserInChat> {

    @Override
    @Named("dto")
    @Mapping(target = "id", source = "chat.id")
    @Mapping(target = ".", source = "chat")
    @Mapping(target = "role", source = "role.name")
    ChatDTO dto(UserInChat userInChat);

    @Override
    @IterableMapping(qualifiedByName = "dto")
    Collection<ChatDTO> dto(Collection<UserInChat> userInChats);

    @InheritConfiguration(name = "dto")
    ChatDTO.WithUsers withUsersDTO(UserInChat userInChat);

    @InheritConfiguration(name = "dto")
    ChatDTO.WithMessages withMessagesDTO(UserInChat userInChat);

    @InheritConfiguration(name = "dto")
    ChatDTO.Full fullDTO(UserInChat userInChat);
}
