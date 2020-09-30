package ch.tbz.chat.domain.datatransfer.message;

import ch.tbz.chat.domain.datatransfer.DTOMapper;
import ch.tbz.chat.domain.model.Message;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Collection;

@Mapper
public interface MessageMapper extends DTOMapper<MessageDTO, Message> {

    @Override
    @Named("dto")
    MessageDTO dto(Message message);

    @Override
    @IterableMapping(qualifiedByName = "dto")
    Collection<MessageDTO> dto(Collection<Message> messages);

    @Mapping(target = "chatId", source = "chat.id")
    MessageDTO.WithChatId withChatIdDTO(Message message);

}
