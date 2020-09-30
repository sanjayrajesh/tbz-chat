package ch.tbz.chat.domain.datatransfer.user;

import ch.tbz.chat.domain.datatransfer.ConfigurableMappingStrategyFactory;
import ch.tbz.chat.domain.datatransfer.MappingStrategyFactory;
import ch.tbz.chat.domain.model.User;

public interface UserMappingStrategyFactory extends MappingStrategyFactory<UserDTO, User>, ConfigurableMappingStrategyFactory<UserDTO, User, UserMappingConfiguration> {
}
