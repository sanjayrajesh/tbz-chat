package ch.tbz.chat.domain.datatransfer.userinchat.chat;

import ch.tbz.chat.domain.datatransfer.ConfigurableMappingStrategyFactory;
import ch.tbz.chat.domain.datatransfer.MappingStrategyFactory;
import ch.tbz.chat.domain.datatransfer.chat.ChatDTO;
import ch.tbz.chat.domain.model.UserInChat;

public interface UserInChatToChatMappingStrategyFactory extends MappingStrategyFactory<ChatDTO, UserInChat>, ConfigurableMappingStrategyFactory<ChatDTO, UserInChat, UserInChatToChatMappingConfiguration> {
}
