package ch.tbz.chat.domain.datatransfer.userinchat.user;

import ch.tbz.chat.domain.datatransfer.ConfigurableMappingStrategyFactory;
import ch.tbz.chat.domain.datatransfer.MappingStrategyFactory;
import ch.tbz.chat.domain.datatransfer.user.UserDTO;
import ch.tbz.chat.domain.model.UserInChat;

public interface UserInChatToUserMappingStrategyFactory extends MappingStrategyFactory<UserDTO, UserInChat>, ConfigurableMappingStrategyFactory<UserDTO, UserInChat, UserInChatToUserMappingConfiguration> {
}
