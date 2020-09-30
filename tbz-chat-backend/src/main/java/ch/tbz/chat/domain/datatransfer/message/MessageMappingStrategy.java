package ch.tbz.chat.domain.datatransfer.message;

import ch.tbz.chat.domain.datatransfer.MappingStrategy;
import ch.tbz.chat.domain.model.Message;

public interface MessageMappingStrategy extends MappingStrategy<MessageDTO, Message> {
}
