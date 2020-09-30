package ch.tbz.chat.domain.datatransfer.message;

import ch.tbz.chat.domain.datatransfer.ConfigurableMappingStrategyFactory;
import ch.tbz.chat.domain.datatransfer.MappingStrategyFactory;
import ch.tbz.chat.domain.model.Message;

public interface MessageMappingStrategyFactory extends MappingStrategyFactory<MessageDTO, Message>, ConfigurableMappingStrategyFactory<MessageDTO, Message, MessageMappingConfiguration> {
}
