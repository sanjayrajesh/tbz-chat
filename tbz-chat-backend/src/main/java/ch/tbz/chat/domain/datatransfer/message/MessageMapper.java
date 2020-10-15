package ch.tbz.chat.domain.datatransfer.message;

import ch.tbz.chat.domain.datatransfer.DTOMapper;
import ch.tbz.chat.domain.model.Message;
import org.mapstruct.*;

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

    MessageDTO.WithAuthor withAuthorDTO(Message message);

    @Mapping(target = "chatId", source = "chat.id")
    MessageDTO.Full fullDTO(Message message);

    Message message(MessageDTO messageDTO);

}
